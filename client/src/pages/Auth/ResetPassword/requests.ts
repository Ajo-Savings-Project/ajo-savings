import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  email: z.string().email(),
})

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof ResetPasswordSchema>) =>
      request.post('/reset-password', data).then((r) => {
        const result = ResetPasswordSchema.safeParse(r.data)
        if (result.success) return r
        return Promise.reject(result.error)
      }),
  })
}

const changePassErr = 'Should be minimum of 5 characters'
export const ChangePasswordSchema = z
  .object({
    newPassword: z.string().min(5, changePassErr),
    confirmPassword: z.string().min(5, changePassErr),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof ChangePasswordSchema>) => {
      const res = await request.post('/change-password', data)
      const result = ChangePasswordSchema.safeParse(res.data)
      if (result.success) return res
      return Promise.reject(result.error)
    },
  })
}
