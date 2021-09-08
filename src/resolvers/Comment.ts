import { Context, UsersElement, PostsElement } from "../types";

export const Comment = {
  author(parent: any, args: any, { db }: Context, info: any) {
    return db.users.find((user: UsersElement) => user?.id === parent.author);
  },
  post(parent: any, args: any, { db }: Context, info: any) {
    return db.posts.find((post: PostsElement) => post?.id === parent.post);
  },
};
