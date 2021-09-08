import { PostsElement, CommentsElement, Context } from "../types";

export const User = {
  posts(parent: any, args: any, { db }: Context, info: any) {
    return db.posts.filter((post: PostsElement) => post?.author === parent.id);
  },
  comments(parent: any, args: any, { db }: Context, info: any) {
    return db.comments.filter(
      (comment: CommentsElement) => comment?.author === parent.id
    );
  },
};
