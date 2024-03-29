import { z, object } from 'zod'
import request from 'api'
import { useMutation } from 'react-query'

export const SetTargetSchema = z.object({
  name: z.string().min(1, 'Target is required'),
  targetAmount: z.string().min(1, 'Total amount is required'),
  frequency: z.string().min(1, 'Frequency is required'),
  category: z.string().min(1, 'Category is required'),

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
    name: z.string(),
    targetAmount: z.string(),
    frequency: z.string(),
    category: z.string(),
    startDate: z.string(),
    withdrawalDate: z.string(),
  }),
})

export const useCreateTargetMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof SetTargetSchema>) => {
      const res = await request.post('/targets/createTarget', {
        ...data,
        targetAmount: Number(data.targetAmount),
      })
      const result = SetTargetResponseSchema.safeParse(res.data)
      if (result.success) return result
    },
  })
}
