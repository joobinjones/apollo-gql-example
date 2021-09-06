import { ApolloServer } from "apollo-server";
import db from "./db.js";
import {
  checkIfUserExists,
  checkIfPostExists,
  findIndexOfItem,
} from "./middleware.js";
import resolvers from "./resolvers/index.js";
import typeDefs from "./schema/index.js";
import uuidv1 from "uuid/v1.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db, checkIfUserExists, checkIfPostExists, findIndexOfItem, uuidv1 },
});
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
