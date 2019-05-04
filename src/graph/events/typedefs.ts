export const typeDefs = `
  type Events {
    _id: ID,
    event: String,
    cost: Float,
  }
  type EventWithPromotionData {
    _id: ID,
    event: String,
    cost: Float,
    promotions: [PromotionRules]
  }
`
