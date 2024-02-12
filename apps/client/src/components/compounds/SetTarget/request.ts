import { z, object } from 'zod'

export const SetTargetSchema = z.object({
  target: z.string().min(1, 'Target is required'),
  targetAmount: z.string().min(1, 'Total amount is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  startDate: z
    .string()
    .refine((date) => date.length > 0, { message: 'Start Date is required' }),
  withdrawalDate: z.string().refine((date) => date.length > 0, {
    message: 'Withdrawal Date is required',
  }),
})

export const SetTargetResponseSchema = z.object({
  success: z.boolean(),
  data: object({
    targetId: z.string(),
    message: z.string(),
  }),
})
