import fs from 'fs'
import { compile } from 'handlebars'
import nodemailer from 'nodemailer'
import Env from '../config/env'

type CreateEmailType = {
  to: string
  subject: string
  templatePath: string
  templateContext: Record<string, unknown>
}

const readTemplate = async (path: string) => {
  try {
    return fs.readFileSync(path, { encoding: 'utf-8' })
  } catch (error) {
    throw new Error('Error reading template file: ' + error)
  }
}

/**
 * Factory function to create an email
 * @param {string} to
 * @param {string} subject
 * @param {string} templatePath
 * @param {Record<string, unknown>} templateContext
 * @returns {Promise<{sendMail: () => Promise<SMTPTransport.SentMessageInfo>}>}
 */
async function createEmail({
  to,
  subject,
  templatePath,
  templateContext,
}: CreateEmailType) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: Env.GMAIL_USER,
      pass: Env.GMAIL_PASSWORD,
    },
  })

  const template = await readTemplate(templatePath)
  const html = compile(template)(templateContext)

  const mailOptions = {
    from: process.env.GMAIL_USER,
    sender: 'Ajo Savings',
    to,
    subject,
    html,
  }

  return {
    sendMail: () => {
      return transporter.sendMail(mailOptions)
    },
  }
}

export { createEmail, readTemplate }
