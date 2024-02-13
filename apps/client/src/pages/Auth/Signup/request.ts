import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email().min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    password: z.string().min(7, 'Password is required'),
    confirmPassword: z.string().min(7, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
export const RegisterResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
})

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      const { confirmPassword: _, ...rest } = data
      const res = await request.post('/users/register', rest)
      const result = RegisterResponseSchema.safeParse(res.data)
      if (result.success) return result
    },
  })
}
