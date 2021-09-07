import { Users, Posts, Comments } from ".";

interface DB {
  users: Users;
  posts: Posts;
  comments: Comments;
}

interface Context {
  db: DB;
  checkIfUserExists: Function;
  checkIfPostExists: Function;
  findIndexOfItem: Function;
  uuidv1: Function;
}

export { DB, Context };
