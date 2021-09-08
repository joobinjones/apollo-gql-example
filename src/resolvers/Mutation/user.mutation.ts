import { Context, UsersElement, PostsElement, CommentsElement } from "../../types";

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
