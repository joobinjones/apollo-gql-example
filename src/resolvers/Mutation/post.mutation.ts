import { Context, PostsElement, CommentsElement } from "../../types";

export const postMutations = {
  createPost(
    parent: any,
    args: any,
    { db, checkIfUserExists, uuidv1 }: Context,
    info: any
  ) {
    checkIfUserExists(args.data.author, db.users);
    const post = {
      id: uuidv1(),
      ...args.data,
    };
    db.posts.push(post);
    return post;
  },
  updatePost(
    parent: any,
    { id, data }: any,
    { db, checkIfPostExists }: Context,
    info: any
  ) {
    const post = db.posts.find((post: PostsElement) => post?.id === id);
    if (!post) {
      throw new Error("Post Not Found!");
    }
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
