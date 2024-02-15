import { Response } from 'express'
import Env from '../config/env'

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER: 500,
} as const

export const HTTP_STATUS_HELPER = {
  [HTTP_STATUS_CODE.INTERNAL_SERVER]: function (
    res: Response,
    err?: Error | unknown
  ) {
    const defaultError = `Something went wrong, our team has been notified`

    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER).json({
      message: Env.IS_PROD
        ? `Something went wrong, our team has been notified`
        : err ?? defaultError,
    })
  },
  [HTTP_STATUS_CODE.BAD_REQUEST]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      ...obj,
      message: obj.message ?? 'Bad Request',
    })
  },
  [HTTP_STATUS_CODE.UNAUTHORIZED]: function (res: Response, message: string) {
    res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({ message })
  },
  [HTTP_STATUS_CODE.FORBIDDEN]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res
      .status(HTTP_STATUS_CODE.FORBIDDEN)
      .json({ ...obj, message: 'You are not allowed to make this request' })
  },
  [HTTP_STATUS_CODE.NOT_FOUND]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      ...obj,
      message: obj.message ?? 'Not Found',
    })
  },
  [HTTP_STATUS_CODE.CONFLICT]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.CONFLICT).json({ ...obj })
  },
  [HTTP_STATUS_CODE.SUCCESS]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      ...obj,
      message: obj.message ?? 'Success',
    })
  },
} as const
