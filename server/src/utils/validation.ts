import z from 'zod'

export const validateUserSchema = z.object({
  firstName: z.string({ required_error: 'firstname is required' }),
  lastName: z.string({ required_error: 'lastname is required' }),
  email: z
    .string({ required_error: 'email is required' })
    .email({ message: 'mail is invalid' }),
  phone: z.string({ required_error: 'phone number is required' }).min(11),
  password: z.string({ required_error: 'password is required' }).min(7),
  confirm_password: z.string({ required_error: 'password is required' }).min(7),
})
