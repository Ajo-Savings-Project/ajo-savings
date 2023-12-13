import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import request from 'api'
import { object, z } from 'zod'

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email().min(1, 'Email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    password: z.string().min(6, 'Password is required'),
    confirmPassword: z.string().min(6, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
const RegisterResponseSchema = z.object({
  message: z.string(),
  user: object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
  }),
})

export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ['signup-user'],
    mutationFn: async (data: z.infer<typeof RegisterSchema>) => {
      try {
        const res = await request.post('/users/register', data)
        const result = RegisterResponseSchema.safeParse(res.data)
        if (result.success) {
          return result.data
        }
        console.log(result.error)
      } catch (e) {
        const err = e as AxiosError<z.infer<typeof RegisterResponseSchema>>
        if (err.response) {
          const msg: string = err.response?.data.message
          toast(msg)
        }
        return Promise.reject(e)
      }
    },
  })
}
