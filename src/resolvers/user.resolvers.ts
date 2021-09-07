import { UsersElement, PostsElement, CommentsElement, Context } from "../types";

export default {
  Query: {
    users(parent: any, args: any, { db }: Context, info: any) {
      if (args.query) {
        return db.users.filter((user: UsersElement) =>
          user?.name.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db?.users;
    },
  },
  Mutation: {
    createUser(parent: any, args: any, { db, uuidv1 }: Context, info: any) {
      const emailIsTaken = db.users.some(
        (user: UsersElement) => user?.email === args.data.email
      );
      if (emailIsTaken) {
        throw new Error("This email is already in use");
      }
      const user = {
        id: uuidv1(),
        ...args.data,
      };
      db.users.push(user);
      return user;
    },
    deleteUser(parent: any, args: any, { db, findIndexOfItem }: Context, info: any) {
      const userIndex = findIndexOfItem(args.id, db.users, "User");
      const deletedUser = db.users.splice(userIndex, 1)[0];
      // remove the posts by the deleted user
      db.posts = db.posts.filter((post: PostsElement) => {
        const match = post?.author === args.id;
        // for each matched post to the deleted user, delete all of the post's comments
        if (match) {
          db.comments = db.comments.filter(
            (comment: CommentsElement) => comment?.post !== post?.id
          );
        }
        return !match;
      });
      // finally, remove all comments by the deleted user
      db.comments = db.comments.filter(
        (comment: CommentsElement) => comment?.author !== args.id
      );
      return deletedUser;
    },
  },
  User: {
    posts(parent: any, args: any, { db }: Context, info: any) {
      return db.posts.filter((post: PostsElement) => post?.author === parent.id);
    },
    comments(parent: any, args: any, { db }: Context, info: any) {
      return db.comments.filter(
        (comment: CommentsElement) => comment?.author === parent.id
      );
    },
  },
};
