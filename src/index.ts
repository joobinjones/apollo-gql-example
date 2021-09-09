import { ApolloServer } from "apollo-server";
// import { execute, subscribe } from "graphql";
import { checkIfUserExists, checkIfPostExists, findIndexOfItem } from "./middleware";
import db from "./db";
import { PubSub } from "graphql-subscriptions";
// import { RedisPubSub } from "graphql-redis-subscriptions";
import { schema } from "./schema";
// import { SubscriptionServer } from "subscriptions-transport-ws";
import uuid from "uuid/index";

// using Redis instead of regular PubSub from gql-subs because better for production
// const pubsub = new RedisPubSub();
const pubsub = new PubSub();
// const subscriptionServer = new SubscriptionServer(
//   { schema, execute, subscribe },
//   { server, path: server.graphqlPath }
// );
const server = new ApolloServer({
  schema,
  context: {
    db,
    pubsub,
    checkIfUserExists,
    checkIfPostExists,
    findIndexOfItem,
    uuidv1: uuid.v1,
  },
});
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
