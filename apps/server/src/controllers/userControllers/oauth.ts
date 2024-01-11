import { Request, Response } from 'express'
import { ENV } from '../../config'
import { HTTP_STATUS_CODE } from '../../constants'
import logger from '../../utils/logger'
import { OAuth2Client } from 'google-auth-library'
import Users, { role, authMethod } from '../../models/users'
import { Op } from 'sequelize'
import { v4 as uuidV4 } from 'uuid'
import { GenerateOTP } from '../../utils/helpers'
import * as bgJobs from '../../backgroundJobs'
import Env from '../../config/env'
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../constants'
import { Jwt } from '../../utils/helpers'

const port = ENV.PORT

export const oAuthUrl = async (req: Request, res: Response) => {
  try {
    const redirectUrl = `http://127.0.0.1:${port}/api/v1/oauth/oauth`
    const oAuth2Client = new OAuth2Client(
      ENV.OAUTH_CLIENT_ID,
      ENV.OAUTH_CLIENT_SECRET,
      redirectUrl
    )
    // Generate the url that we're to use to ping Google with
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline', // this will force a refresh token to be created
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid email', // what you want to do when the user grants access
      prompt: 'consent',
    })
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Success',
      url: authorizeUrl,
    })
  } catch (error) {
    logger.error('OAuth Request Error', error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}

const getUserData = async (access_token: unknown, res: Response) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )
    const data = await response.json()
    logger.info('User Data', data)

    const { given_name, family_name, email } = data

    const userExist = await Users.findOne({
      where: {
        [Op.or]: [
          { firstName: given_name },
          { lastName: family_name },
          { email: email },
        ],
      },
    })

    if (!userExist) {
      const otpInfo = GenerateOTP()
      const otp = otpInfo.otp.toString()
      const id = uuidV4()

      const user = await Users.create({
        id,
        firstName: given_name,
        lastName: family_name,
        email: email,
        phone: '',
        password: '',
        profilePic: '',
        role: role.CONTRIBUTOR,
        otp,
        otp_expiry: otpInfo.expiry,
        authMethod: authMethod.OAUTH,
        gender: '',
        occupation: '',
        bvn: '',
        address: '',
        identification_number: '',
        identification_doc: '',
        proof_of_address_doc: '',
        isVerified: false,
      })

      bgJobs.signUpSendVerificationEmail({
        email,
        otp,
        firstName: user.firstName,
      })
      bgJobs.setupGlobalWallet({ userId: user.id })
      bgJobs.setupPersonalGroupWallet({ userId: user.id })
      bgJobs.setupPersonalSavingsWallet({ userId: user.id })
      bgJobs.setupSettings({ userId: user.id })

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: `Registration Successful`,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      })
    } else {
      try {
        const payload = {
          id: userExist.id,
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

        // Return basic user data to client-side
        return res.status(HTTP_STATUS_CODE.SUCCESS).json({
          message: [`Login Successful`],
          user: {
            id: userExist.id,
            email: userExist.email,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
          },
          token: accessToken,
        })
      } catch (error) {
        logger.error('Error logging user in with Google OAuth', error)
        return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
          message: [`This is our fault, our team are working to resolve this.`],
        })
      }
    }
  } catch (error) {
    logger.error('Error fetching user data from Google', error)
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}

export const getUserTokens = async (req: Request, res: Response) => {
  const code = req.query.code as string
  try {
    const redirectUrl = `http://127.0.0.1:${port}/api/v1/oauth/oauth`
    const oAuth2Client = new OAuth2Client(
      ENV.OAUTH_CLIENT_ID,
      ENV.OAUTH_CLIENT_SECRET,
      redirectUrl
    )
    const tokenResponse = await oAuth2Client.getToken(code)
    await oAuth2Client.setCredentials(tokenResponse.tokens)
    logger.info('Tokens acquired successfully')
    const user = oAuth2Client.credentials
    logger.info('User Credentials', user)
    await getUserData(user.access_token, res)
  } catch (error) {
    logger.error('Error with signing in with Google', error)
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: 'Something went wrong, our team has been notified.',
    })
  }
}
