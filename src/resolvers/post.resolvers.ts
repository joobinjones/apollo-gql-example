import { UsersElement, CommentsElement, Context } from "../types";

export const Post = {
  author(parent: any, args: any, { db }: Context, info: any) {
    return db.users.find((user: UsersElement) => user?.id === parent.author);
  },
  comments(parent: any, args: any, { db }: Context, info: any) {
    return db.comments.filter(
      (comment: CommentsElement) => comment?.post === parent.id
    );
  },
};
