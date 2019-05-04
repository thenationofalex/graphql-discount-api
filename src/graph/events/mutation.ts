export const mutation = `
  newEvent(
    event: String,
    cost: Float
  ): Events
  editEvent(
    id: ID,
    event: String,
    cost: Float
  ): Events
`
