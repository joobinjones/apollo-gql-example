import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "graphql-tools";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PubSub } from "graphql-subscriptions/dist/pubsub";
import db from "./db";
import uuid from "uuid";
import { findItem, findIndexOfItem } from "./middleware";

const app = express();
const schema = makeExecutableSchema({ typeDefs, resolvers });
const pubsub = new PubSub();
const httpServer = createServer(app);
const context = { db, findItem, findIndexOfItem, uuidv1: uuid.v1, pubsub };
const apolloServer = new ApolloServer({
  schema,
  context,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          },
        };
      },
    },
  ],
});
const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: apolloServer.graphqlPath }
);
async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  httpServer.listen(8080, () => {
    console.log("Server running at http://localhost:8080/graphql");
  });
}
startServer();

export { pubsub, context };
