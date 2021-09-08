import { Context, PostsElement } from "../../types";

export const posts = (parent: any, args: any, { db }: Context, info: any) => {
  if (args.query) {
    const query = args.query.toLowerCase();
    return db.posts.filter((post: PostsElement) => {
      const isTitleMatch = post?.title.toLowerCase().includes(query);
      const isBodyMatch = post?.body.toLowerCase().includes(query);
      return isTitleMatch || isBodyMatch;
    });
  }
  return db.posts;
};
