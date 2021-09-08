import { Query } from "./Query";
import { Mutation } from "./Mutation";
import { User } from "./user.resolvers";
import { Post } from "./post.resolvers";
import { Comment } from "./comment.resolvers";

export const resolvers = { Query, Mutation, User, Post, Comment };
