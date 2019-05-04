import { EventModel, findEventById } from '../../models/events'

export const resolvers = {
  Mutation: {
    editEvent: async (root, args, ctx) => {
      const { id, event, cost } = args
      return EventModel.findOneAndUpdate(
        { _id: id },
        { event, cost },
        { upsert: false, new: true }
      ).exec()
    },
    newEvent: async (root, args, ctx) => {
      const { event, cost } = args
      return EventModel.create({ event, cost })
    }
  },
  Query: {
    allEvents: async (root, args, ctx) => {
      return EventModel.find({}).lean().exec()
    },
    getEvent: async (root, args, ctx) => {
      const { id } = args
      return findEventById(id)
    }
  }
}
