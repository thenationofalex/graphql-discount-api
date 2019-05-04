import { PromotionModel } from '../../models/promotions'

export const resolvers = {
  Mutation: {
    newGlobalPromotion: async (root, args, ctx) => {
      const { text, modulo, discount } = args
      return PromotionModel.create({ global: true, rules: { text, modulo, discount } })
    },
    newPromotion: async (root, args, ctx) => {
      const { eventIds, text, modulo, discount  } = args
      return PromotionModel.create({
        eventIds,
        rules: { text, modulo, discount }
      })
    },
    setPromotionStatus: async (root, args, ctx) => {
      const { id, active } = args
      return PromotionModel.findOneAndUpdate(
        { _id: id },
        {  active },
        { upsert: false, new: true }
      ).exec()
    }
  },
  Query: {
    allPromotions: async (root, args, ctx) => {
      return PromotionModel.find().lean().exec()
    },
    getPromotion: async (root, args, ctx) => {
      const { id } = args
      return PromotionModel.findById(id).lean().exec()
    }
  }
}
