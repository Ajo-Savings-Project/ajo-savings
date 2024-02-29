import { Request, Response } from 'express'
import _, { toLower } from 'lodash'
import { pipe, trim } from 'rambda'
import { Op } from 'sequelize'
import { v4, v4 as uuidV4 } from 'uuid'
import { sendSignupVerificationEmailJob } from '../../../backgroundJobs/signupVerifyTask'
import {
  setupSettings,
  setupWallets,
} from '../../../backgroundJobs/walletTasks'
import Env from '../../../config/env'
import { HTTP_STATUS_CODE, HTTP_STATUS_HELPER } from '../../../constants'
import { RequestExt } from '../../../middleware/authorization/authentication'
import TempTokens from '../../../models/userPasswordToken'
import Users, { authMethod, role } from '../../../models/users'
import {
  generateLongString,
  Jwt,
  PasswordHarsher,
  passwordUtils,
} from '../../../utils/helpers'
import { registerSchema, verifyEmailSchema } from '../../../utils/validators'

type JobType = Users & { token: string }

const settingsJob = (user: Users) => {
  setupSettings({ userId: user.id })
  return user
}
const walletsJob = (user: Users) => {
  setupWallets({ userId: user.id })
  return user
}
const emailVerifyJob = (user: JobType) => {
  sendSignupVerificationEmailJob(user)
  return user
}

const runSetupTasks = pipe(emailVerifyJob, walletsJob, settingsJob)

const createEmailVerificationToken = async (id: string, email?: string) => {
  const secret = generateLongString(50)
  const verifyToken = await Jwt.sign(
    {
      id,
      email: email ?? '',
      type: 'signup-verify',
    },
    { _secret: Env.JWT_SECRET + secret, expiresIn: '1d' }
  )

  await TempTokens.create({
    id: v4(),
    secret,
    token: verifyToken,
    used: false,
  })
  return secret
}

export const registerUser = async (req: Request, res: Response) => {
  const passwordRegex = passwordUtils.regex

  try {
    const userValidate = registerSchema.strict().safeParse(req.body)

    if (!userValidate.success) {
      // TODO: send to error logger - userValidate.error.issues
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: userValidate.error.issues,
      })
    }

    const { firstName, lastName, email, phone, password } = userValidate.data

    if (!passwordRegex.test(password)) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: passwordUtils.error,
      })
    }

    const newEmail = email.trim().toLowerCase()

    //TODO: Validate 9ja phone number
    const userExist = await Users.findOne({
      where: {
        [Op.or]: [{ email: newEmail }, { phone: phone }],
      },
    })

    if (!userExist) {
      const hashedPassword = await PasswordHarsher.hash(trim(password))
      const id = uuidV4()

      const user = await Users.create(
        {
          id,
          firstName: toLower(trim(firstName)),
          lastName: toLower(trim(lastName)),
          email: trim(newEmail),
          phone: trim(phone),
          password: hashedPassword,
          role: role.CONTRIBUTOR,
          authMethod: authMethod.BASIC,
        },
        { returning: true }
      )

      const secret = await createEmailVerificationToken(id, trim(newEmail))

      runSetupTasks({
        token: secret,
        ..._.omit(user.dataValues, ['password']),
      } as JobType)

      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
        data: _.pick(user, ['id', 'email', 'firstName', 'lastName']),
      })
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
      message: 'This account already exist',
    })
  } catch (error) {
    console.log(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

export const verifyUserEmail = async (req: Request, res: Response) => {
  try {
    const isSecretValid = verifyEmailSchema.strict().safeParse(req.body)

    if (!isSecretValid.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: isSecretValid.error.issues,
      })
    }

    const verifyRecord = await TempTokens.findOne({
      where: { secret: isSecretValid.data.token, used: false },
    })

    if (!verifyRecord) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.NOT_FOUND](res)
    }

    const { secret: _secret, token } = verifyRecord

    const { valid, expired, data } = await Jwt.isTokenExpired(
      token,
      Env.JWT_SECRET + _secret
    )

    if (!valid || expired) {
      const user = await Users.findOne({ where: { id: data.id } })
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {
        message: 'Invalid or expired token.',
        data: {
          code: !valid ? 'IN_VALID' : 'EXPIRED',
          email: user?.email,
        },
      })
    }

    await verifyRecord.update({ used: true })
    const user = await Users.update(
      { emailIsVerified: true },
      { where: { id: data.id }, returning: true }
    )

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
      message: 'Email verified successfully',
      data: {
        email: user[1][0].email,
      },
    })
  } catch (error) {
    console.error(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res, {
      error: 'Verification failed',
    })
  }
}

export const resendVerifyUserEmail = async (req: RequestExt, res: Response) => {
  try {
    const { _userId: id, _user } = req.body
    if (!_user.emailIsVerified) {
      const secret = await createEmailVerificationToken(id, trim(_user.email))
      emailVerifyJob({ ..._user.dataValues, token: secret } as JobType)
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.CONFLICT](res, {
      message: 'User already verified.',
    })
  } catch (error) {
    console.error(error)
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}

export const resendVerifyUserEmailWithToken = async (
  req: Request,
  res: Response
) => {
  try {
    const validData = verifyEmailSchema.strict().safeParse(req.body)

    if (!validData.success) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.BAD_REQUEST](res, {
        message: validData.error.issues,
      })
    }

    const verifyRecord = await TempTokens.findOne({
      where: { secret: validData.data.token, used: false },
    })

    if (!verifyRecord) {
      return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {
        message: 'Token already used!',
      })
    }

    const { secret, token } = verifyRecord

    const { valid, expired, data } = await Jwt.isTokenExpired(
      token,
      Env.JWT_SECRET + secret
    )

    if (valid && expired) {
      const user = await Users.findOne({ where: { id: data.id } })
      if (user) {
        const secret = await createEmailVerificationToken(data.id, user?.email)
        await verifyRecord.update({ used: true })
        emailVerifyJob({ ...user.dataValues, token: secret } as JobType)
        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res)
      }
    }
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.FORBIDDEN](res, {
      message:
        valid && !expired
          ? "Your previous token isn't expired yet."
          : 'Invalid token!',
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
