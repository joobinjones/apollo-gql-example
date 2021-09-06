import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";

const getSchema = async () =>
  await loadSchemaSync("src/schema/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  });
export default await getSchema();
