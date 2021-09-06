import commentResolvers from "./commentResolvers.js";
import postResolvers from "./postResolvers.js";
import userResolvers from "./userResolvers.js";

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
