import Env from '../config/env'

export * from './httpStatusCode'

export const ACCESS_TOKEN = 'sessions.accessToken.ajo'
export const REFRESH_TOKEN = 'sessions.ajo'
export const JWT_ACCESS_TOKEN_EXPIRATION_TIME = Env.IS_PROD ? '5m' : '35m'
export const JWT_REFRESH_TOKEN_EXPIRATION_TIME = Env.IS_PROD ? '15m' : '40m'
export const JWT_EXPIRATION_STATUS_CODE = 'JWT: Expired'
export const JWT_INVALID_STATUS_CODE = 'JWT: Invalid'
