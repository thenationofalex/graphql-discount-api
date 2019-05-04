import * as Mongoose from 'mongoose'

export interface IPromotions extends Mongoose.Document {
  global: boolean,
  eventIds: [any],
  rules: {
    text: string,
    modulo: number,
    discount: number
  }
}
