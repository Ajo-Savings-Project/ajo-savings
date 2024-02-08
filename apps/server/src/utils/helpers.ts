import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { ENV } from '../config'
import { v4 } from 'uuid'
import Transactions from '../models/transactions'

export const passwordUtils = {
  length: 5,
  regex: ENV.IS_PROD
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{5,}$/
    : /^[A-Za-z0-9]{5,}$/,
  error: ENV.IS_PROD
    ? `Password: Min 5 characters, with an uppercase, a lowercase, a number, and a special character.`
    : 'Password: Min 5 characters, uppercase or lowercase.',
}

export class PasswordHarsher {
  static async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }

  static async hash(password: string) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  }
}

export class Jwt {
  static async sign<
    TokenPayload extends Record<
      string,
      string | Record<string, unknown> | Array<unknown>
    >,
  >(payload: TokenPayload, options?: jwt.SignOptions & { _secret?: string }) {
    const { _secret, ...restOptions } = options ?? {}
    return jwt.sign(payload, _secret ?? ENV.JWT_SECRET!, restOptions)
  }

  static async verify<T extends JwtPayload>(
    token: string,
    options?: jwt.VerifyOptions & { complete?: true; _secret?: string }
  ): Promise<T> {
    const { _secret, ...restOptions } = options ?? {}
    return jwt.verify(token, _secret ?? ENV.JWT_SECRET!, restOptions) as T
  }

  static async isTokenExpired<T extends JwtPayload>(
    token: string,
    secret?: string
  ) {
    try {
      const payload = await this.verify(token, {
        _secret: secret || ENV.JWT_SECRET,
      })
      return { data: payload as T, expired: false, valid: true }
    } catch (e) {
      if (e instanceof jwt.TokenExpiredError) {
        return {
          data: (await jwt.decode(token)) as T,
          expired: true,
          valid: true,
        }
      } else {
        const decoded = (await jwt.decode(token)) as JwtPayload
        return {
          data: (decoded || {}) as T,
          expired:
            (decoded?.exp && decoded?.exp < Math.floor(Date.now() / 1000)) ||
            true,
          valid: false,
          error: e,
        }
      }
    }
  }
}

/**
 * GenerateOTP
 * @param {{expires: number}} options
 * @returns {{otp: number, expiry: Date}}
 * @constructor
 */
export const GenerateOTP = (options?: { expires: number }) => {
  const otp = Math.floor(100000 + Math.random() * 900000)
  const expiry = new Date()
  expiry.setTime(
    new Date().getTime() + Number(options?.expires) || 30 * 60 * 1000
  )
  return { otp, expiry }
}

type CookieString = string
/**
 * Get cookie values
 * @param {CookieString} cookies
 * @returns {Record<string, string>}
 */
export const getCookieValue = (cookies: CookieString) => {
  if (!cookies) return {}
  return cookies.split('; ').reduce((acc: Record<string, string>, cur) => {
    const [k, v] = cur.split('=')
    acc[k] = v
    return acc
  }, {})
}

export const generateLongString = (length: number) => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  let counter = 0
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
    counter += 1
  }
  return result
}

export class DateHandler {
  static getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate()
  }

  static getNextFriday = (date: Date) => {
    const dayOfWeek = date.getDay()
    let daysUntilFriday = 5 - dayOfWeek

    if (daysUntilFriday <= 0) {
      daysUntilFriday += 7
    }

    const nextFriday = new Date(date)
    nextFriday.setDate(date.getDate() + daysUntilFriday)

    return nextFriday
  }

  static isValidDate = (value: string): boolean => {
    const date = new Date(value)
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
  }

  static isPastDate = (value: string): boolean => {
    const date = new Date(value)
    const currentDate = new Date()
    return date < currentDate
  }
}

export interface TransactionDetails {
  walletId: string
  ownerId: string
  amount: number
  status: string
  action: string
  type: string
  receiverId?: string
  senderId?: string
}

export const createTransaction = async (details: TransactionDetails) => {
  const transaction = await Transactions.create({
    id: v4(),
    walletId: details.walletId,
    ownerId: details.ownerId,
    amount: details.amount,
    status: details.status,
    action: details.action,
    type: details.type,
    receiverId: details.receiverId,
    senderId: details.senderId,
  })
  return transaction
}
