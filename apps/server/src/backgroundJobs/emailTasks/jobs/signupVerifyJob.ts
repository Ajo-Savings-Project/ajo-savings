import nodemailer from 'nodemailer'
import { compile } from 'handlebars'
import Env from '../../../config/env'
import { readTemplate } from '../templates/readTemplate'

const transporter = nodemailer.createTransport({
  // email service configuration
  service: 'Gmail',
  auth: {
    user: Env.GMAIL_USER,
    pass: Env.GMAIL_PASSWORD,
  },
})

export const signupVerificationMail = async (values: {
  email: string
  firstName: string
  token: string
}) => {
  try {
    // Read the Handlebars template
    const template = await readTemplate('verifySignup')

    // Compile the template
    const compiledTemplate = compile(template)

    // Replace placeholders in the template with actual data
    const html = compiledTemplate({
      ...values,
      link: `${Env.FE_BASE_URL}/verify-email?user=${values.token}`,
    })

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: values.email,
      subject: 'Verify Email address',
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent:' + info.response)
  } catch (error) {
    console.error(error)
    // Handle email sending failure
  }
}
