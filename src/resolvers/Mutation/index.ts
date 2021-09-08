import { commentMutations } from "./comment.mutation";
import { postMutations } from "./post.mutation";
import { userMutations } from "./user.mutation";

export const Mutation = {
  ...userMutations,
  ...postMutations,
  ...commentMutations,
};
