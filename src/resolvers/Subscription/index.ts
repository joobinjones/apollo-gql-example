import { Context } from "../../types";
import { pubsub } from "../../index";
import { findItem } from "../../middleware";
import db from "../../db";

export const Subscription = {
  count: {
    subscribe() {
      // set up the subscription
      let count = 0;
      setInterval(() => {
        count++;
        // publish data to it
        pubsub.publish("count", { count });
      }, 1000);
      return pubsub.asyncIterator("count");
    },
  },
  comment: {
    subscribe(parent: any, { postId }: any) {
      const post = findItem(postId, db.posts, "Post");
      return pubsub.asyncIterator(`COMMENT_${postId}`);
    },
  },
};
