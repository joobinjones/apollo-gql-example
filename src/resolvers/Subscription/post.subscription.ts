import { Context } from "../../types";

export const post = {
  subscribe(parent: any, args: any, { pubsub }: Context) {
    return pubsub.asyncIterator("POST");
  },
};
