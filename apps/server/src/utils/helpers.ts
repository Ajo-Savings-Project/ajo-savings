import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ENV } from '../config'

export interface TokenPayload {
  id: string
  email: string
}

export const passwordUtils = {
  regex:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.&])[A-Za-z\d@$!%*?.&]{7,}$/,
  error: `Password must be at least 7 characters and should contain at least one uppercase letter, one lowercase letter, one special character, and one number.`,
}

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export const GenerateToken = async (payload: TokenPayload) => {
  return jwt.sign(payload, ENV.APP_SECRET!, { expiresIn: '1d' })
}

export const GenerateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000)
  const expiry = new Date()
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000)
  return { otp, expiry }
}
