export const typeDefs = `
  type Promotions {
    _id: ID,
    active: Boolean,
    global: Boolean,
    eventIds: [String],
    rules: PromotionRules
  }
  type PromotionRules {
    text: String,
    modulo: Int,
    discount: Float
  }
`
