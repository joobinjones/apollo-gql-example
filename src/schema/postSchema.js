import { gql } from "apollo-server";

export default gql`
  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
`;
