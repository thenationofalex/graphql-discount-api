import { ApolloServer } from 'apollo-server-hapi'
import * as dotenv from 'dotenv'
import * as depthLimit from 'graphql-depth-limit'
import * as Hapi from 'hapi'

import { Config } from './config'
import schema from './graph'
import { connectToMongo } from './models'

dotenv.config()

const app = new Hapi.Server({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: false
  }
})

const startServer = async () => {
  await connectToMongo()

  const server = new ApolloServer({
    introspection: true,
    playground: true, // Disabled in production
    schema,
    tracing: true,
    validationRules: [
      depthLimit(2)
    ]
  })

  await server.applyMiddleware({ app })

  try {
    await app.start()
    console.log(`🦄 Discount API Running - ${app.info.uri}`)
  } catch (err) {
    console.log(`🔥 Error: ${err.message}`)
  }
}

startServer()
