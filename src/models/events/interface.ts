import * as Mongoose from 'mongoose'

export interface IEventSchema extends Mongoose.Document {
  event: string,
  cost: number
}

export interface IFindEvents {
  _id: string,
  event: string,
  cost: string,
  qty?: number,
  promotions: {
    text: string,
    modulo: string,
    discount: string
  }
}
