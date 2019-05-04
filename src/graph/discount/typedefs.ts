export const typeDefs = `
  input Cart {
    eventId: String,
    qty: Int
  }
  type Discounts {
    eventId: ID,
    qty: Int,
    cost: Float,
    total: Float,
    discountTotal: Float,
    globalDiscountApplied: Boolean
  }
`
