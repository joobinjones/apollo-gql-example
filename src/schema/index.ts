import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";

export const typeDefs = loadSchemaSync("src/schema/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});
