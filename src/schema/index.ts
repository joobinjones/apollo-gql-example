import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "../resolvers";

export const typeDefs = loadSchemaSync("src/schema/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
