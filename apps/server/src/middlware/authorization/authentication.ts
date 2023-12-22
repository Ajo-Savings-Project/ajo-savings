import { NextFunction, Response, Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import Env from '../../config/env'
import {
  HTTP_STATUS_CODE,
  JWT_EXPIRATION_STATUS_CODE,
  JWT_INVALID_STATUS_CODE,
  REFRESH_TOKEN,
} from '../../constants'
import Users from '../../models/users'
import { getCookieValue, Jwt } from '../../utils/helpers'

export const authorizationMiddleware = async (
  req: Request & { user: Users },
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers?.authorization

    if (!authorization) {
      return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
        message: 'Unauthorized access',
        code: JWT_INVALID_STATUS_CODE,
      })
    }

    const token = authorization.split(' ')[1] as string

    const { data, expired, valid } = await Jwt.isTokenExpired<Users>(token)

    if (!expired && valid) {
      /**
       * TODO: use redis to cache logged users (reduce data base query for performance)
       * if we may need more data than **id** that the jwt token provides
       * we would need to call db and cache the result in redis,
       * the next call will read from redis instead.
       *
       * check our cache for this user
       * if user is fresh, query db the add to cache
       * set user object to req.user
       *
       * for now, only user.id is sent back
       */
      req['user'] = data
      return next()
    }
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: 'Unauthorized access',
      code: JWT_EXPIRATION_STATUS_CODE,
    })
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
  //TODO: check if it is white listed, therefore not revoked.
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
