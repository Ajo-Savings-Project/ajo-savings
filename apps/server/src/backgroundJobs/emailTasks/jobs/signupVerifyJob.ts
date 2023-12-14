import * as fs from 'fs'
import nodemailer from 'nodemailer'
import { compile } from 'handlebars'
import Env from '../../../config/env'
import { GenerateToken } from '../../../utils/helpers'

// TODO: move this function
const readTemplate = async (name: string) => {
  try {
    return fs.readFileSync(require.resolve(`../templates/${name}.html`), {
      encoding: 'utf-8',
    })
  } catch (error) {
    throw new Error('Error reading template file: ' + error)
  }
}

const baseUrl = `http://localhost:${Env.PORT}`

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
      id: values.firstName,
      email: values.email,
    }
    const token = await GenerateToken(tokenPayload)

    // Read the Handlebars template
    const template = await readTemplate('verifySignup')

    // Compile the template
    const compiledTemplate = compile(template)

    // Replace placeholders in the template with actual data
    const html = compiledTemplate({
      ...values,
      link: `${baseUrl}/verify-email?otp=${values.otp}&token=${token}`,
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
