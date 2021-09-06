import { findIndexOfItem } from "../middleware.js";
import db from "../db.js";
import uuidv1 from "uuid/v1.js";

export default {
  Query: {
    users(parent, args, ctx, info) {
      if (args.query) {
        return db.users.filter((user) =>
          user.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.users;
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailIsTaken = db.users.some((user) => user.email === args.data.email);
      if (emailIsTaken) {
        throw new Error("This email is already in use");
      }
      const user = {
        id: uuidv1(),
        ...args.data,
      };
      db.users.push(user);
      return user;
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = findIndexOfItem(args.id, db.users, "User");
      const deletedUser = db.users.splice(userIndex, 1)[0];
      // remove the posts by the deleted user
      posts = posts.filter((post) => {
        const match = post.author === args.id;
        // for each matched post to the deleted user, delete all of the post's comments
        if (match) comments = comments.filter((comment) => comment.post !== post.id);
        return !match;
      });
      // finally, remove all comments by the deleted user
      db.comments = db.comments.filter((comment) => comment.author !== args.id);
      return deletedUser;
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return db.posts.filter((post) => post.author === parent.id);
    },
    comments(parent, args, ctx, info) {
      return db.comments.filter((comment) => comment.author === parent.id);
    },
  },
};
