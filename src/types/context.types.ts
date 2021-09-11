// import { RedisPubSub } from "graphql-redis-subscriptions";
import { PubSub } from "graphql-subscriptions";
import { Users, Posts, Comments } from ".";

interface DB {
  users: Users;
  posts: Posts;
  comments: Comments;
}

interface Context {
  db: DB;
  pubsub: PubSub;
  findItem: Function;
  findIndexOfItem: Function;
  uuidv1: Function;
}

export { DB, Context };
