import commentResolvers from "./comment.resolvers";
import { mergeResolvers } from "@graphql-tools/merge";
import postResolvers from "./post.resolvers";
import userResolvers from "./user.resolvers";

const resolvers = [userResolvers, postResolvers, commentResolvers];
export default mergeResolvers(resolvers);
