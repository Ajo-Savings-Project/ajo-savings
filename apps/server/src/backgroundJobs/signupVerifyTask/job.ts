import Env from '../../config/env'
import { createEmail } from '../../utils/createEmailFactory'

export type MailSignupT = {
  email: string
  token: string
  firstName: string
  lastName: string
}
export const mailSignUpVerify = async (values: MailSignupT) => {
  console.log(values)

  try {
    const registrationVerifyEmail = await createEmail({
      to: values.email,
      subject: 'Verify Email address',
      templatePath: require.resolve('./verifySignup.html'),
      templateContext: {
        ...values,
        link: `${Env.FE_BASE_URL}/verify-email?user=${values.token}`,
      },
    })
    return await registrationVerifyEmail.sendMail()
  } catch (error) {
    return error
  }
}
