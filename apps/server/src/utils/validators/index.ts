import z from 'zod'
import { REFRESH_TOKEN } from '../../constants'
import { passwordUtils } from '../helpers'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, 'firstname is required'),
  lastName: z.string().min(2, 'lastname is required'),
  email: z.string().email({ message: 'email is invalid' }),
  // TODO: improve phone number validation
  phone: z.string().min(11, 'phone number is required'),
  password: z.string().min(5, passwordUtils.error),
})

export const refreshTokenSchema = z.object({
  [REFRESH_TOKEN]: z.string(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'email is invalid' }),
})
export const createGroupSchema = z.object({
  groupName: z.string(),
  contributionAmount: z.number(),
  purposeAndGoals: z.string(),
  frequency: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  numberOfParticipants: z.number(),
  duration: z.string(),
})

export const fundWalletSchema = z.object({
  amount: z.number().refine((value) => value > 0, {
    message: 'amount must be greater than zero',
  }),
})
