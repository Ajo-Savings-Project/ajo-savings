import { Request, Response } from 'express'
import _ from 'lodash'
import Env from '../../../config/env'
import {
  HTTP_STATUS_CODE,
  HTTP_STATUS_HELPER,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../../constants'
import Users from '../../../models/users'
import { Jwt, PasswordHarsher } from '../../../utils/helpers'
import { loginSchema } from '../../../utils/validators'

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = loginSchema.strict().safeParse(req.body)

    if (!validationResult.success) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        message: validationResult.error.issues,
      })
    }

    const { email, password } = validationResult.data

    const confirmUser = await Users.findOne({
      where: { email: email },
    })

    if (confirmUser) {
      const confirmPassword = await PasswordHarsher.compare(
        password,
        confirmUser.password
      )

      if (confirmPassword) {
        const payload = {
          id: confirmUser.id,
        }

        const accessToken = await Jwt.sign(payload, {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        })

        const refreshToken = await Jwt.sign(payload, {
          expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
          _secret: Env.JWT_REFRESH_SECRET,
        })

        res.cookie(REFRESH_TOKEN, refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          secure: Env.IS_PROD,
        })

        return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.SUCCESS](res, {
          data: _.pick(confirmUser.dataValues, [
            'id',
            'email',
            'firstName',
            'lastName',
            'kycComplete',
          ]),
          token: accessToken,
        })
      }
    }

    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.UNAUTHORIZED](res, {
      message: 'Invalid Credentials!',
    })
  } catch (error) {
    return HTTP_STATUS_HELPER[HTTP_STATUS_CODE.INTERNAL_SERVER](res)
  }
}
