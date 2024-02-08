import { z, object } from 'zod'
const FrequencyEnum = {
  Daily: 'Daily',
  Weekly: 'Weekly',
  Monthly: 'Monthly',
}

export const SetTargetSchema = z.object({
  target: z.string().min(1, 'Target is required'),
  targetAmount: z.number().positive().min(1),
  frequency: z
    .string()
    .refine((value) => Object.values(FrequencyEnum).includes(value), {
      message: 'Frequency is required and must be a valid enum value',
    }),
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
