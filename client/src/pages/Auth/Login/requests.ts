import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
})

const LoginResponseSchema = z.object({
  refreshToken: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  id: z.string(),
})

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (data: z.infer<typeof LoginSchema>) =>
      request.post('/login', data).then((r) => {
        const result = LoginResponseSchema.safeParse(r.data)
        if (result.success) return r
        return Promise.reject(result.error)
      }),
  })
}
