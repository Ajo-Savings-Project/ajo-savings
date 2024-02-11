import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
})
const ResetPasswordResponseSchema = z.object({
  message: z.string(),
})

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ['reset-password'],
    mutationFn: async (data: z.infer<typeof ResetPasswordSchema>) => {
      const res = await request.post('/users/forgotPassword', data)
      const result = ResetPasswordResponseSchema.safeParse(res.data)
      if (result.success) return result.data
    },
  })
}

const changePassErr = 'Should be minimum of 5 characters'
export const ChangePasswordSchema = z
  .object({
    newPassword: z.string().min(7, changePassErr),
    confirmPassword: z.string().min(7, changePassErr),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

const ChangePasswordResponseSchema = z.object({
  message: z.string(),
  email: z.string(),
})

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ['change-password'],
    mutationFn: async (
      data: z.infer<typeof ChangePasswordSchema> & { token: string }
    ) => {
      const res = await request.post(
        `/users/resetPassword?verify=${data.token}`,
        {
          newPassword: data.newPassword,
          token: data.token,
        }
      )
      const result = ChangePasswordResponseSchema.safeParse(res.data)
      if (result.success) return res
    },
  })
}
