import nodemailer from 'nodemailer'
import { compile } from 'handlebars'
import Env from '../../../config/env'
import { Jwt, PasswordHarsher } from '../../../utils/helpers'
import { readTemplate } from '../templates/readTemplate'

const baseUrl = `http://localhost:3000`

const transporter = nodemailer.createTransport({
  // email service configuration
  service: 'Gmail',
  auth: {
    user: Env.GMAIL_USER,
    pass: Env.GMAIL_PASSWORD,
  },
})

export const mailOTP = async (values: {
  email: string
  otp: string
  firstName: string
  lastName: string
}) => {
  try {
    //generate non-sensitive token
    const tokenPayload = {
      email: values.email,
      otp: values.otp,
    }
    const secret = await PasswordHarsher.hash(values.otp)

    const token = await Jwt.sign(tokenPayload, { _secret: secret })

    // Read the Handlebars template
    const template = await readTemplate('verifySignup')

    // Compile the template
    const compiledTemplate = compile(template)

    // Replace placeholders in the template with actual data
    const html = compiledTemplate({
      ...values,
      link: `${baseUrl}/verify-email?user=${token}`,
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
