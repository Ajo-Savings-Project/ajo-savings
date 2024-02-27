import Env from '../../config/env'
import { createEmail } from '../../utils/createEmailFactory'

export const mailResetPassword = async (values: {
  email: string
  firstName: string
  token: string
}) => {
  try {
    const link = `${Env.FE_BASE_URL}/auth/reset-password?verify=${values.token}`

    const resetPassword = await createEmail({
      to: values.email,
      subject: 'Reset Your Password',
      templatePath: require.resolve('./resetPassword.html'),
      templateContext: {
        ...values,
        link,
      },
    })
    return await resetPassword.sendMail()
  } catch (error) {
    return error
  }
}
