import { Context, PostsElement, CommentsElement } from "../../types";

export const postMutations = {
  createPost(parent: any, args: any, { db, findItem, uuidv1 }: Context, info: any) {
    findItem(args.data.author, db.users, "User");
    const post = {
      id: uuidv1(),
      ...args.data,
    };
    db.posts.push(post);
    return post;
  },
  updatePost(parent: any, { id, data }: any, { db, findItem }: Context, info: any) {
    const post = findItem(id, db.posts, "Post");

    if (typeof data.title === "string") {
      post!.title = data.title;
    }
    if (typeof data.body === "string") {
      post!.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post!.published = data.published;
    }
    return post;
  },
  deletePost(parent: any, args: any, { db, findIndexOfItem }: Context, info: any) {
    const postIndex = findIndexOfItem(args.id, db.posts, "Post");
    const deletedPost = db.posts.splice(postIndex, 1)[0];
    db.comments = db.comments.filter(
      (comment: CommentsElement) => comment?.post !== args.id
    );
    return deletedPost;
  },
};
