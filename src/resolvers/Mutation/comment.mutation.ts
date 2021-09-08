import { Context } from "../../types";

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
