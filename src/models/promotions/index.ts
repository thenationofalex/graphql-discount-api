import * as Mongoose from 'mongoose'
import { IPromotions } from './interface'

const PromotionSchema = new Mongoose.Schema({
  active: { type: Boolean, default: true },
  eventIds: [{ type: Mongoose.Schema.Types.ObjectId, ref: 'Events' }],
  global: Boolean,
  rules: {
    discount: Number,
    modulo: Number,
    text: String
  }
}, { timestamps: true })

export const findGlobalPromotions = async () => PromotionModel.find({ active: true, global: true })

export const PromotionModel = Mongoose.model<IPromotions>('Promotions', PromotionSchema, 'Promotions')
