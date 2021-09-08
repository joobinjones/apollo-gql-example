import { Context, CommentsElement } from "../../types";

export const commentMutations = {
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
