import { useMutation } from 'react-query'
import request from 'api'
import { z } from 'zod'
import { useAuth } from 'contexts'

export const RegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  password: z.string().min(6, 'Password is required'),
  confirmPassword: z.string()
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
      request.post('/signup', data).then((r) => {
        const result = RegisterResponseSchema.safeParse(r.data)
        if (result.success) {
          return r
        }
        return Promise.reject(result.error)
      }),
  })
}


