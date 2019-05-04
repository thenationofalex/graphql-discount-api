import * as Mongoose from 'mongoose'
import { Config } from '../config'

export const connectToMongo = async () => {

  Mongoose.connect(`mongodb://${Config.database.host}:${Config.database.port}/${Config.database.name}`)

  return new Promise((resolve, reject) => {
    Mongoose.connection.on('error', (e) => {
      console.error(`🔥 FAILED to connect to mongodb`, e)
      reject(e)
    })
    Mongoose.connection.on('close', () => {
      console.info(`🐢 Connection closed on ${Config.database.host}`)
    })
    Mongoose.connection.on('reconnected', () => {
      console.info(`🐢 Reconnected to ${Config.database.host}`)
    })
    Mongoose.connection.on('disconnected', () => {
      console.info(`🐢 Disconnected from ${Config.database.host}`)
    })
    Mongoose.connection.on('open', () => {
      console.info(`🐢 Connected to mongodb at ${Config.database.host}:${Config.database.name}`)
      resolve()
    })
  })
}
