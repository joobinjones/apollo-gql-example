import { Context } from "../../types";

export const Subscription = {
  count: {
    subscribe(parent: any, args: any, { pubsub }: Context, info: any) {
      // set up the subscription
      let count = 0;
      setInterval(() => {
        count++;
        // publish data to it
        pubsub.publish("count", count);
      }, 1000);
      return pubsub.asyncIterator("count");
    },
  },
};
