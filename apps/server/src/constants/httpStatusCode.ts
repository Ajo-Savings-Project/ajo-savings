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
      message: Env.IS_PROD ? defaultError : err ?? defaultError,
    })
  },
  [HTTP_STATUS_CODE.BAD_REQUEST]: function (
    res: Response,
    obj: Record<string, unknown> = {}
  ) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
      message: 'Bad Request',
      ...obj,
    })
  },
  [HTTP_STATUS_CODE.UNAUTHORIZED]: function (
    res: Response,
    obj: Record<string, unknown> = {}
  ) {
    res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: "You don't have access to this resource.", ...obj })
  },
  [HTTP_STATUS_CODE.FORBIDDEN]: function (
    res: Response,
    obj: Record<string, unknown> = {}
  ) {
    res
      .status(HTTP_STATUS_CODE.FORBIDDEN)
      .json({ message: 'You are not allowed to make this request', ...obj })
  },
  [HTTP_STATUS_CODE.NOT_FOUND]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.NOT_FOUND).json({
      message: 'Not Found',
      ...obj,
    })
  },
  [HTTP_STATUS_CODE.CONFLICT]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.CONFLICT).json({ message: '', ...obj })
  },
  [HTTP_STATUS_CODE.SUCCESS]: function (
    res: Response,
    obj: Record<string, unknown>
  ) {
    res.status(HTTP_STATUS_CODE.SUCCESS).json({
      message: 'Success',
      ...obj,
    })
  },
} as const
