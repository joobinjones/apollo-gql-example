// import { RedisPubSub } from "graphql-redis-subscriptions";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Users, Posts, Comments } from ".";

interface DB {
  users: Users;
  posts: Posts;
  comments: Comments;
}

interface Context {
  db: DB;
  pubsub: RedisPubSub;
  checkIfUserExists: Function;
  checkIfPostExists: Function;
  findIndexOfItem: Function;
  uuidv1: Function;
}

export { DB, Context };
