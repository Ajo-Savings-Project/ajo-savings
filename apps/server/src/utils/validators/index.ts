import z from 'zod'
import { REFRESH_TOKEN } from '../../constants'
import { targetCategoryType, targetFrequencyType } from '../../models/targets'
import { transactionActionType } from '../../models/transactions'
import { passwordUtils } from '../helpers'
import { DateHandler } from '../helpers'

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

export const editProfileSchema = z.object({
  gender: z.string().min(2, {
    message: 'Gender is required and must be at least 2 characters long',
  }),
  occupation: z.string().min(2, {
    message: 'Occupation is required and must be at least 2 characters long',
  }),
  dateOfBirth: z
    .string()
    .refine(
      (value) =>
        DateHandler.isValidDate(value) && DateHandler.isPastDate(value),
      {
        message: 'Date of birth is required, must be a valid past date',
      }
    ),
  bvn: z.string().min(2, {
    message: 'BVN is required and must be at least 2 characters long',
  }),
  address: z.string().min(2, {
    message: 'Address is required and must be at least 2 characters long',
  }),
  identificationType: z.string().min(2, {
    message:
      'Identification type is required and must be at least 2 characters long',
  }),
  identificationNumber: z.string().min(2, {
    message:
      'Identification number is required and must be at least 2 characters long',
  }),
  identificationDoc: z.string().min(2, {
    message:
      'Identification document is required and must be at least 2 characters long',
  }),
  proofOfAddressDoc: z.string().min(2, {
    message:
      'Proof of address document is required and must be at least 2 characters long',
  }),
})

export const refreshTokenSchema = z.object({
  [REFRESH_TOKEN]: z.string(),
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'email is invalid' }),
})

export const verifyEmailSchema = z.object({
  token: z.string().min(0),
})

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(5, passwordUtils.error),
  newPassword: z.string().min(5, passwordUtils.error),
})

export const resetPasswordSchema = z.object({
  token: z.string(),
  newPassword: z.string().min(5, passwordUtils.error),
})

export const createGroupSchema = z.object({
  groupName: z.string().min(2, {
    message:
      'The name of the group is required and must be at least 2 characters long',
  }),
  purposeAndGoals: z.string().min(2, {
    message:
      'Purpose and goals of the group is required and must be at least 2 characters long',
  }),
  recurringAmount: z.number().refine((value) => value > 0, {
    message: 'amount must be greater than zero',
  }),
  // frequency: z.union([...Object.values(frequency).map((v)=> z.literal(v))]),
  frequency: z.union([
    z.literal('DAILY'),
    z.literal('WEEKLY'),
    z.literal('MONTHLY'),
  ]),
  maxNumberOfParticipants: z.number().refine((value) => value > 0, {
    message: 'amount must be greater than zero',
  }),
  groupImage: z
    .string()
    .min(2, {
      message:
        'The group image url path is required and must be at least 2 characters long',
    })
    .optional(),
  automaticRestartCycle: z.boolean(),
})

export const joinGroupSchema = z.object({
  groupId: z.string(),
  groupTitle: z.string(),
})

export const fundWalletSchema = z.object({
  amount: z.number().refine((value) => value > 0, {
    message: 'amount must be greater than zero',
  }),
  groupId: z.string(),
  targetId: z.string(),
  transactionType: z.union([
    z.literal(transactionActionType.CREDIT),
    z.literal(transactionActionType.DEBIT),
  ]),
})

export const createTargetSchema = z.object({
  name: z.string(),
  targetAmount: z.number(),
  frequency: z.union([
    z.literal(targetFrequencyType.ANNUALLY),
    z.literal(targetFrequencyType.MONTHLY),
    z.literal(targetFrequencyType.WEEKLY),
    z.literal(targetFrequencyType.DAILY),
  ]),
  category: z.union([
    z.literal(targetCategoryType.TRAVEL),
    z.literal(targetCategoryType.DREAM_CAR),
    z.literal(targetCategoryType.GADGETS),
    z.literal(targetCategoryType.RENT),
    z.literal(targetCategoryType.OTHER),
    z.literal(targetCategoryType.DREAM_HOME),
  ]),
  startDate: z.string(),
  withdrawalDate: z.string(),
})
