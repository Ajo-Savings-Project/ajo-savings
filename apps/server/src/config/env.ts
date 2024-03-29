import dotenv from 'dotenv'

// Check condition to determine which environment to use
const isProduction = process.env.NODE_ENV === 'production'

// Specify the path to the .env file
const envFilePath = isProduction ? '.env.production' : '.env.development'

// Load the environment variables from the specified file
const result = dotenv.config({ path: envFilePath })

if (result.error) {
  process.exit(1)
}

const {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  HOSTNAME,
  GMAIL_USER,
  GMAIL_PASSWORD,
  APP_SECRET,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  REDIS,
  FE_BASE_URL,
  CLOUDINARY_NAME,
  API_KEY_4_CLOUDINARY,
  API_SECRET_4_CLOUDINARY,
  PAYSTACK_KEY,
  DSN,
} = process.env

const ENV = {
  PORT,
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  HOSTNAME,
  GMAIL_USER,
  GMAIL_PASSWORD,
  APP_SECRET,
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  REDIS,
  IS_PROD: isProduction,
  FE_BASE_URL,
  CLOUDINARY_NAME,
  API_KEY_4_CLOUDINARY,
  API_SECRET_4_CLOUDINARY,
  PAYSTACK_KEY,
  DSN,
}

export default ENV
