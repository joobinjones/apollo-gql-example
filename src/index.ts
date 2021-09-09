import { ApolloServer } from "apollo-server-express";
import { checkIfUserExists, checkIfPostExists, findIndexOfItem } from "./middleware";
import { createServer } from "http";
import db from "./db";
import { execute, subscribe } from "graphql";
import express from "express";
import { typeDefs } from "./schema";
import {resolvers} from "./resolvers"
import { useServer } from "graphql-ws/lib/use/ws";
import uuid from "uuid/index";
import ws from "ws";

const app = express();
const httpServer = createServer(app);
const subscriptionServer = new ws.Server({ port: 8181, path: "/graphql" });
useServer({schema: , roots}, subscriptionServer)
const server = new ApolloServer({
  schema,
  context: {
    db,
    checkIfUserExists,
    checkIfPostExists,
    findIndexOfItem,
    uuidv1: uuid.v1,
  },
});
makeExecutableSchema({ typeDefs, resolvers });
const subscriptionServer = SubscriptionServer.create(
  { schema, execute, subscribe },
  { server: httpServer, path: server.graphqlPath }
);
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
