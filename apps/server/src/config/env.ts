import dotenv from 'dotenv'

// Check condition to determine which environment to use
const isProduction = process.env.NODE_ENV === 'production'

// Specify the path to the .env file
const envFilePath = isProduction ? '.env.production' : '.env.development'
console.log(`running in ${process.env.NODE_ENV} mode`)

// Load the environment variables from the specified file
const result = dotenv.config({ path: envFilePath })

if (result.error) {
  console.error(`Failed to load environment variables from ${envFilePath}`)
  process.exit(1)
}

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
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  REDIS,
  FE_BASE_URL
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
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  REDIS,
  IS_PROD: isProduction,
  FE_BASE_URL,
}

export default ENV
