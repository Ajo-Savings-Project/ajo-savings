import dotenv from 'dotenv'

dotenv.config()

const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  GMAIL_USER,
  GMAIL_PASSWORD,
  APP_SECRET,
} = process.env

const ENV = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  GMAIL_USER,
  GMAIL_PASSWORD,
  APP_SECRET,
}

export default ENV
