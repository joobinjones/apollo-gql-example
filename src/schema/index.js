import { gql } from "apollo-server";
import userSchema from "./userSchema.js";
import postSchema from "./postSchema.js";
import commentSchema from "./commentSchema.js";

const queryAndMutation = gql`
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }
`;

export default [queryAndMutation, userSchema, postSchema, commentSchema];
