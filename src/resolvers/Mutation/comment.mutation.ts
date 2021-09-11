import { Context, CommentsElement } from "../../types";
import { pubsub } from "../..";

export const commentMutations = {
  createComment(
    parent: any,
    args: any,
    { db, findItem, uuidv1 }: Context,
    info: any
  ) {
    findItem(args.data.author, db.users, "User");
    findItem(args.data.post, db.posts, "Post");

    const comment = {
      id: uuidv1(),
      ...args.data,
    };
    db.comments.push(comment);
    pubsub.publish(`COMMENT_${args.data.post}`, { comment });
    return comment;
  },
  updateComment(parent: any, { id, data }: any, { db }: Context, info: any) {
    const comment = db.comments.find(
      (comment: CommentsElement) => comment?.id === id
    );
    if (!comment) {
      throw new Error("Comment Not Found!");
    }
    if (typeof data.text === "string") {
      comment!.text = data.text;
    }
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
};
