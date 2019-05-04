export const mutation = `
  newPromotion(
    eventIds: [String],
    text: String,
    modulo: Int,
    discount: Float
  ): Promotions
  newGlobalPromotion(
    text: String,
    modulo: Int,
    discount: Float
  ): Promotions
  setPromotionStatus(
    id: ID,
    active: Boolean
  ): Promotions
`
