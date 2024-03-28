import { Request, Response } from 'express'
import Env from '../../../config/env'
import {
  HTTP_STATUS_CODE,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_INVALID_STATUS_CODE,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN,
} from '../../../constants'
import Users from '../../../models/users'
import { Jwt } from '../../../utils/helpers'
import { refreshTokenSchema } from '../../../utils/validators'

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const isValidObj = refreshTokenSchema.strict().safeParse(req.body)

    if (!isValidObj.success) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
        message: 'This is our fault, our engineers have been notified.',
      })
    }

    const oldAccessToken = req.headers?.authorization?.split(' ')[1] as string

    const { valid, data } = await Jwt.isTokenExpired<Users>(oldAccessToken)

    if (valid) {
      const payload = { id: data.id }
      /**
       * TODO: Rotation and Revocation:
       * Implement token rotation, where each time a refresh token is used,
       * it is replaced with a new one, and the old one is invalidated.
       */
      const refreshToken = await Jwt.sign(payload, {
        expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        _secret: Env.JWT_REFRESH_SECRET,
      })

      const accessToken = await Jwt.sign(payload, {
        expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      })

      res.cookie(REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: Env.IS_PROD,
      })

      return res.status(HTTP_STATUS_CODE.SUCCESS).json({
        message: ['Success'],
        token: accessToken,
      })
    }
  } catch (error) {
    return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).send({
      code: JWT_INVALID_STATUS_CODE,
      message: 'Something has gone wrong.',
    })
  }
}
