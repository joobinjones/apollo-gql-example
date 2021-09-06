import commentResolvers from "./comment.js";
import postResolvers from "./post.js";
import userResolvers from "./user.js";

export default {
  ...userResolvers,
  ...postResolvers,
  ...commentResolvers,
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
