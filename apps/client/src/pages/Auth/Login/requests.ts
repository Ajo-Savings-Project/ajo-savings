import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

export const LoginResponseSchema = z.object({
  token: z.string(),
  data: z.object({
    id: z.string(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    kycComplete: z.boolean(),
  }),
})

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const res = await request.post('/users/login', data)
      request.defaults.headers['Authorization'] = `Bearer ${res.data.token}`
      const result = LoginResponseSchema.safeParse(res.data)
      if (result.success) return result
    },
  })
}
