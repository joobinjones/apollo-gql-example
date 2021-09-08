import {
  Context,
  UsersElement,
  PostsElement,
  CommentsElement,
  User,
} from "../../types";

export const userMutations = {
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
  updateUser(
    parent: any,
    { id, data }: any,
    { db, checkIfUserExists }: Context,
    info: any
  ) {
    checkIfUserExists(id, db);
    const user = db.users.find((user: UsersElement) => user?.id === id);
    if (typeof data.email === "string") {
      const emailIsTaken = db.users.some(
        (user: UsersElement) => user?.email === data.email
      );
      if (emailIsTaken) {
        throw new Error("Email is taken.");
      }
      user!.email = data.email;
    }
    if (typeof data.name === "string") {
      user!.name = data.name;
    }
    if (typeof data.age === "number") {
      user!.age = data.age;
    }
    return user;
  },
  deleteUser(parent: any, args: any, { db, findIndexOfItem }: Context, info: any) {
    const userIndex = findIndexOfItem(args.id, db.users, "User");
    const deletedUser = db.users.splice(userIndex, 1)[0];
    db.posts = db.posts.filter((post: PostsElement) => {
      const match = post?.author === args.id;
      if (match) {
        db.comments = db.comments.filter(
          (comment: CommentsElement) => comment?.post !== post?.id
        );
      }
      return !match;
    });
    db.comments = db.comments.filter(
      (comment: CommentsElement) => comment?.author !== args.id
    );
    return deletedUser;
  },
};
