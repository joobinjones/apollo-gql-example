import { Context, UsersElement } from "../../types";

export const users = (parent: any, args: any, { db }: Context, info: any) => {
  if (args.query) {
    return db.users.filter((user: UsersElement) =>
      user?.name.toLowerCase().includes(args.query.toLowerCase())
    );
  }
  return db?.users;
};
