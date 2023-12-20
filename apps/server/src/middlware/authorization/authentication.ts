import { NextFunction, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import Env from '../../config/env'
import {
  HTTP_STATUS_CODE,
  JWT_EXPIRATION_STATUS_CODE,
  REFRESH_TOKEN,
} from '../../constants'
import { getCookieValue, Jwt } from '../../utils/helpers'

export const authorizationMiddleware = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization
    if (authorization === undefined) {
      return res.status(401).send({
        status: 'There is an Error',
        message: 'Ensure that you are logged in',
      })
    }
    const pin = authorization.split(' ')[1]
    if (!pin || pin === '') {
      return res.status(401).send({
        status: 'Error',
        message: "The pin can't be used",
      })
    }
    req.user = await Jwt.verify(pin)

    return next()
  } catch (err) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: 'Unauthorized access',
      code: JWT_EXPIRATION_STATUS_CODE,
    })
  }
}

export const validateRefreshTokenMiddleWare = async (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  const cookies = getCookieValue(req.headers.cookie)
  const token = cookies[REFRESH_TOKEN]
  //TODO: check if it is white listed
  const hasExpired = await Jwt.isTokenExpired(token, Env.JWT_REFRESH_SECRET)
  if (!hasExpired.expired) {
    req.body[REFRESH_TOKEN] = token
    return next()
  }
  return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
    message: 'Unauthorized access',
    code: JWT_EXPIRATION_STATUS_CODE,
  })
}
