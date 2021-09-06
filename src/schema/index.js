import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const getSchema = async () =>
  loadSchemaSync("src/schema/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });
export default await getSchema();
