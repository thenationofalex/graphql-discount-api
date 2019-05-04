import { isEmpty } from 'lodash'
import * as Mongoose from 'mongoose'

import { IEventSchema, IFindEvents } from './interface'

import { PromotionModel } from '../promotions'

const EventSchema = new Mongoose.Schema({
  cost: Number,
  event: { type: String, unique: true },
}, { timestamps: true })

export const findEventById = async (id: Mongoose.Types.ObjectId): Promise<IFindEvents> => {
  const event = await EventModel.findById(id).lean().exec()
  const promotions = await PromotionModel.find({ eventIds: id, active: true }).lean().exec()

  if (!isEmpty(promotions)) {
    event.promotions = []
    promotions.map((p) => event.promotions.push(p.rules))
  }
  return event
}

export const EventModel = Mongoose.model<IEventSchema>('Events', EventSchema, 'Events')
