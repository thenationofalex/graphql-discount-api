import { CalculateDiscount } from '../../lib/discount'

export const resolvers = {
  Query: {
    calculateDiscount: async (root, args, ctx) => {
      const { input } = args
      return CalculateDiscount(input)
    }
  }
}
