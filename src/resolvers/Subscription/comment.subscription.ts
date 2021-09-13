import { Context } from "../../types";

export const comment = {
  subscribe(parent: any, { postId }: any, { db, pubsub, findItem }: Context) {
    findItem(postId, db.posts, "Post");
    return pubsub.asyncIterator(`COMMENT_${postId}`);
  },
};
