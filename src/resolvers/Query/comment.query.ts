import { Context, CommentsElement } from "../../types";

export const comments = (parent: any, args: any, { db }: Context, info: any) => {
  if (args.query) {
    return db.comments.filter((comment: CommentsElement) =>
      comment?.text.toLowerCase().includes(args.query.toLowerCase())
    );
  }
  return db.comments;
};
