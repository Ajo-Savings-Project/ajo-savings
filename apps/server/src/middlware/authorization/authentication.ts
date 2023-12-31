import { NextFunction, Response, Request } from 'express'
import Env from '../../config/env'
import {
  HTTP_STATUS_CODE,
  JWT_EXPIRATION_STATUS_CODE,
  JWT_INVALID_STATUS_CODE,
  REFRESH_TOKEN,
} from '../../constants'
import Users from '../../models/users'
import { getCookieValue, Jwt } from '../../utils/helpers'
import { JwtPayload } from 'jsonwebtoken'

export interface RequestExt extends Request {
  body: Request['body'] & {
    _user?: Users
    _userId?: string
  }
}

export const authorizationMiddleware = async (
  req: RequestExt,
  res: Response,
  next: NextFunction
) => {
  const authorization = req?.headers?.authorization

  if (!authorization) {
    return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
      message: ['Unauthorized access:', 'Token is missing'],
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
     * for now, we always call the db
     */

    req.body['_userId'] = data.id

    req.body['_user'] = await Users.findOne({
      where: { id: data.id },
    })
    return next()
  }
  return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
    message: 'Unauthorized access',
    code: valid ? JWT_EXPIRATION_STATUS_CODE : JWT_INVALID_STATUS_CODE,
  })
}

export const validateRefreshTokenMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reqCookies = req.headers.cookie as string
  const cookies = getCookieValue(reqCookies)
  const token = cookies[REFRESH_TOKEN]
  //TODO: check if it is white listed, therefore not revoked.
  const tokenResponse = await Jwt.isTokenExpired(token, Env.JWT_REFRESH_SECRET)
  if (!tokenResponse.expired) {
    req.body[REFRESH_TOKEN] = token
    return next()
  }
  return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({
    message: 'Unauthorized access',
    code: tokenResponse.valid
      ? JWT_EXPIRATION_STATUS_CODE
      : JWT_INVALID_STATUS_CODE,
  })
}

export const extractJwtMiddleware = (
  req: JwtPayload,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (token) {
    req.refreshToken = token
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
