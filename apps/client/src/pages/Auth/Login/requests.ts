import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

const LoginResponseSchema = z.object({
  refreshToken: z.string(),
  token: z.string(),
  user: z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
})

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof LoginSchema>) => {
      const res = await request.post('/users/login', data)
      //TODO: also prefetch profile data
      const result = LoginResponseSchema.safeParse(res.data)
      if (result.success) return result
    },
  })
}
