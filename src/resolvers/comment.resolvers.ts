import { Context, CommentsElement, UsersElement, PostsElement } from "../types";

export default {
  Query: {
    comments(parent: any, args: any, { db }: Context, info: any) {
      if (args.query) {
        return db.comments.filter((comment: CommentsElement) =>
          comment?.text.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.comments;
    },
  },
  Mutation: {
    createComment(
      parent: any,
      args: any,
      { db, checkIfUserExists, checkIfPostExists, uuidv1 }: Context,
      info: any
    ) {
      checkIfUserExists(args.data.author, db);
      checkIfPostExists(args.data.post, db);

      const comment = {
        id: uuidv1(),
        ...args.data,
      };
      db.comments.push(comment);
      return comment;
    },
    deleteComment(
      parent: any,
      args: any,
      { db, findIndexOfItem }: Context,
      info: any
    ) {
      const commentIndex = findIndexOfItem(args.id, db.comments, "Comment");
      const deletedComment = db.comments.splice(commentIndex, 1)[0];
      return deletedComment;
    },
  },
  Comment: {
    author(parent: any, args: any, { db }: Context, info: any) {
      return db.users.find((user: UsersElement) => user?.id === parent.author);
    },
    post(parent: any, args: any, { db }: Context, info: any) {
      return db.posts.find((post: PostsElement) => post?.id === parent.post);
    },
  },
};
