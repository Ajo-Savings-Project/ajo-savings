import { Sequelize } from 'sequelize'
import ENV from './env'

export const db = new Sequelize(
  ENV.DB_NAME!,
  ENV.DB_USERNAME!,
  ENV.DB_PASSWORD as string,
  {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT as unknown as number,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      encrypt: true,
    },
  }
)
