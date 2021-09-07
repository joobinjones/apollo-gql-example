import { ApolloServer } from "apollo-server";
import db from "./db";
import { checkIfUserExists, checkIfPostExists, findIndexOfItem } from "./middleware";
import schema from "./schema";
import uuidv1 from "uuid/index";

const server = new ApolloServer({
  schema,
  context: { db, checkIfUserExists, checkIfPostExists, findIndexOfItem, uuidv1 },
});
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
