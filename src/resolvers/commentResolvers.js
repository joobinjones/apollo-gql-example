import {
  checkIfUserExists,
  checkIfPostExists,
  findIndexOfItem,
} from "../middleware.js";
import db from "../db.js";
import uuidv1 from "uuid/v1.js";

export default {
  Query: {
    comments(parent, args, ctx, info) {
      if (args.query) {
        return db.comments.filter((comment) =>
          comment.text.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.comments;
    },
  },
  Mutation: {
    createComment(parent, args, ctx, info) {
      checkIfUserExists(args.data.author);
      checkIfPostExists(args.data.post);

      const comment = {
        id: uuidv1(),
        ...args.data,
      };
      db.comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = findIndexOfItem(args.id, db.omments, "Comment");
      const deletedComment = db.comments.splice(commentIndex, 1)[0];
      return deletedComment;
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    post(parent, args, ctx, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  },
};
