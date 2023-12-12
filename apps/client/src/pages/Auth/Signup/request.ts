import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email().min(1, 'Email is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    password: z.string().min(6, 'Password is required'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
const RegisterResponseSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  id: z.string(),
  token: z.string(),
})

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof RegisterSchema>) =>
      request.post('/users/register', data).then((r) => {
        const result = RegisterResponseSchema.safeParse(r.data)
        if (result.success) {
          return r
        }
        return Promise.reject(result.error)
      }),
  })
}
