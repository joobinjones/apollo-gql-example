import { ApolloServer, gql } from "apollo-server";
import uuidv1 from "uuid/v1.js";

// sample data: users, posts, and comments
let users = [
  { id: "1", name: "Austin Jones", email: "austinjones@example.com", age: 24 },
  { id: "2", name: "Andrew Meade", email: "andrew@udemy.com", age: 27 },
  { id: "3", name: "Jane Marie", email: "jane@elmo.com", age: 4 },
  { id: "4", name: "Mia Ann", email: "mia@example.com", age: 1 },
];

let posts = [
  {
    id: "abc123",
    title: "First Post",
    body: "Body of first post.",
    published: true,
    author: "1",
  },
  {
    id: "123abc",
    title: "On the Second World War",
    body: "World War Two was very not good.",
    published: false,
    author: "2",
  },
  {
    id: "def456",
    title: "Post Number Three",
    body: "Huhkay this is the 3rd body.",
    published: false,
    author: "3",
  },
  {
    id: "456def",
    title: "Huhkay Four",
    body: "Alright this is the 4th post.",
    published: true,
    author: "4",
  },
];

let comments = [
  { id: "a", text: "comment one", author: "4", post: "456def" },
  { id: "b", text: "second comment", author: "3", post: "def456" },
  { id: "c", text: "comment number three", author: "1", post: "abc123" },
  { id: "d", text: "fourth and final comment", author: "2", post: "123abc" },
];

// middleware between request and response to be used in resolvers
const middleware = {
  checkIfUserExists(userToFind) {
    if (!users.some((user) => user.id === userToFind)) {
      throw new Error("User Not Found!");
    }
  },
  checkIfPostExists(postToFind) {
    if (!posts.some((post) => post.id === postToFind && post.published)) {
      throw new Error("Post Not Found!");
    }
  },
  findIndexOfUser(userToFind) {
    const userIndex = users.findIndex((user) => user.id === userToFind);
    if (userIndex === -1) {
      throw new Error("User Not Found!");
    }
    return userIndex;
  },
};
const { checkIfUserExists, checkIfPostExists, findIndexOfUser } = middleware;

// Type definitions also known as application schema
const typeDefs = gql`
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
    createComment(data: CreateCommentInput): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;
// Resolvers
const resolvers = {
  Query: {
    posts(parent, args, ctx, info) {
      if (args.query) {
        const query = args.query.toLowerCase();
        return posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(query);
          const isBodyMatch = post.body.toLowerCase().includes(query);
          return isTitleMatch || isBodyMatch;
        });
      }
      return posts;
    },
    users(parent, args, ctx, info) {
      if (args.query) {
        return users.filter((user) =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return users;
    },
    comments(parent, args, ctx, info) {
      if (args.query) {
        return comments.filter((comment) =>
          comment.text.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return comments;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailIsTaken = users.some((user) => user.email === args.data.email);
      if (emailIsTaken) {
        throw new Error("This email is already in use");
      }
      const user = {
        id: uuidv1(),
        ...args.data,
      };
      users.push(user);
      return user;
    },
    createPost(parent, args, ctx, info) {
      checkIfUserExists(args.data.id);
      const post = {
        id: uuidv1(),
        ...args.data,
      };
      posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      checkIfUserExists(args.data.author);
      checkIfPostExists(args.data.post);

      const comment = {
        id: uuidv1(),
        ...args.data,
      };
      comments.push(comment);
      return comment;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = findIndexOfUser(args.id);
      const deletedUser = users.splice(userIndex, 1)[0];
      // remove the posts by the deleted user
      posts = posts.filter((post) => {
        const match = post.author === args.id;
        // for each matched post to the deleted user, delete all of the post's comments
        if (match) comments = comments.filter((comment) => comment.post !== post.id);
        return !match;
      });
      // finally, remove all comments by the deleted user
      comments = comments.filter((comment) => comment.author !== args.id);
      return deletedUser;
    },
  },
  // parent = a post
  User: {
    // parent = a user
    posts(parent, args, ctx, info) {
      return posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.author === parent.id);
    },
  },
  Post: {
    // parent = a post
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => comment.post === parent.id);
    },
  },
  Comment: {
    // parent = a comment
    author(parent, args, ctx, info) {
      return users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => post.id === parent.post);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen({ port: 8080 }).then(({ url }) => {
  console.log(`Server ready at ${url || "http://localhost:4000/"}`);
});
