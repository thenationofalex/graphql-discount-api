import * as dotenv from 'dotenv'
dotenv.config()

export const Config = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: 27017,
    type: 'mongodb',
  },
  server: {
    host: '0.0.0.0',
    port: 8888
  }
}
