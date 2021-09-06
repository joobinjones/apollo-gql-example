import commentResolvers from "./commentResolvers.js";
import { mergeResolvers } from "@graphql-tools/merge";
import postResolvers from "./postResolvers.js";
import userResolvers from "./userResolvers.js";

const resolvers = [userResolvers, postResolvers, commentResolvers];
export default mergeResolvers(resolvers);
