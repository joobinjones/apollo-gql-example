import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
