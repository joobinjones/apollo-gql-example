import {
  DB,
  User,
  Post,
  Comment,
  Users,
  Posts,
  UsersElement,
  PostsElement,
} from "./types";

type DBArray = Array<User | Post | Comment | undefined | null>;

function findItem(itemId: string, data: DBArray, itemType: string) {
  const item = data.find((ele) => ele?.id === itemId);
  if (!item) {
    throw new Error(`${itemType} Not Found!`);
  }
  return item;
}

function findIndexOfItem(itemId: string, data: DBArray, itemType: string) {
  const itemIndex = data.findIndex((ele) => ele?.id === itemId);
  if (itemIndex === -1) {
    throw new Error(`${itemType} Not Found!`);
  }
  return itemIndex;
}

export { findItem, findIndexOfItem };
