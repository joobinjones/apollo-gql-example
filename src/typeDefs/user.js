import { gql } from "apollo-server";

export default gql`
  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
`;
