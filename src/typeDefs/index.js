import { gql } from "apollo-server";
import userSchema from "./user.js";
import postSchema from "./post.js";
import commentSchema from "./comment.js";

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
