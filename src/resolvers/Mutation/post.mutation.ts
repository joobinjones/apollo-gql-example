import { Context, CommentsElement } from "../../types";

export const postMutations = {
  createPost(
    parent: any,
    args: any,
    { db, checkIfUserExists, uuidv1 }: Context,
    info: any
  ) {
    checkIfUserExists(args.data.author, db);
    const post = {
      id: uuidv1(),
      ...args.data,
    };
    db.posts.push(post);
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
