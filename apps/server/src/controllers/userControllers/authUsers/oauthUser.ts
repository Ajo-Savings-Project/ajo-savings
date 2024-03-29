import { Request, Response } from 'express'
import { pipe } from 'rambda'
import {
  setupSettings,
  setupWallets,
} from '../../../backgroundJobs/walletTasks'
import { ENV } from '../../../config'
import { HTTP_STATUS_CODE } from '../../../constants'
import { OAuth2Client } from 'google-auth-library'
import Users, { role, authMethod } from '../../../models/users'
import { v4 as uuidV4 } from 'uuid'
import Env from '../../../config/env'
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../../constants'
import { Jwt } from '../../../utils/helpers'

const redirectUrl = `${ENV.HOSTNAME}:${ENV.PORT}/api/v1/oauth/oauth`

const settingsJob = (userId: string) => {
  setupSettings({ userId })
  return userId
}
const walletsJob = (userId: string) => {
  setupWallets({ userId })
  return userId
}

const runSetupJobs = pipe(settingsJob, walletsJob)

const getUserData = async (access_token: unknown, res: Response) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    )
    const data = await response.json()

    const { given_name, family_name, email } = data

    const userExist = await Users.findOne({
      where: { email: email },
    })

    if (!userExist) {
      const id = uuidV4()

      const user = await Users.create({
        id,
        firstName: given_name,
        lastName: family_name,
        email: email,
        role: role.CONTRIBUTOR,
        authMethod: authMethod.OAUTH,
        emailIsVerified: true,
        password: '',
        phone: '',
      })

      const payload = {
        id: user.id,
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

      const authToken = await Jwt.sign(
        {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          token: accessToken,
        },
        { expiresIn: '30s' }
      )

      runSetupJobs(user.id)

      return res.redirect(
        ENV.FE_BASE_URL + `/auth/login?type=success&oauth_token=${authToken}`
      )
    } else {
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

      const authToken = await Jwt.sign(
        {
          user: {
            id: userExist.id,
            email: userExist.email,
            firstName: userExist.firstName,
            lastName: userExist.lastName,
          },
          token: accessToken,
        },
        { expiresIn: '30s' }
      )

      // Return basic user data to client-side
      return res.redirect(
        ENV.FE_BASE_URL + `/auth/login?type=success&oauth_token=${authToken}`
      )
    }
  } catch (error) {
    return res.redirect(ENV.FE_BASE_URL + `/auth/login?type=error`)
  }
}

export const oAuthUrl = async (req: Request, res: Response) => {
  try {
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
    return res.redirect(ENV.FE_BASE_URL + `/auth/login?type=error`)
  }
}

export const getUserTokens = async (req: Request, res: Response) => {
  const code = req.query.code as string
  try {
    const oAuth2Client = new OAuth2Client(
      ENV.OAUTH_CLIENT_ID,
      ENV.OAUTH_CLIENT_SECRET,
      redirectUrl
    )
    const tokenResponse = await oAuth2Client.getToken(code)
    await oAuth2Client.setCredentials(tokenResponse.tokens)
    const user = oAuth2Client.credentials
    await getUserData(user.access_token, res)
  } catch (error) {
    return res.redirect(ENV.FE_BASE_URL + `/auth/login?type=error`)
  }
}
