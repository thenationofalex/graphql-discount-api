import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'lodash'

import DiscountSchema from './discount'
import EventSchema from './events'
import PromotionSchema from './promotions'

const Query = `
  type Query {
    ${EventSchema.query},
    ${PromotionSchema.query},
    ${DiscountSchema.query}
  }
  type Mutation {
    ${EventSchema.mutation},
    ${PromotionSchema.mutation}
  }
`

const schema = makeExecutableSchema({
  resolvers: merge(
    EventSchema.resolvers,
    PromotionSchema.resolvers,
    DiscountSchema.resolvers
  ),
  typeDefs: [
    Query,
    EventSchema.typeDefs,
    PromotionSchema.typeDefs,
    DiscountSchema.typeDefs
  ]
})

export default schema
