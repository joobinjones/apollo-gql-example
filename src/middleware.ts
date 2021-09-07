import { DB } from "./types";

function checkIfUserExists(userToFind: string, db: DB) {
  if (!db.users.some((user) => user?.id === userToFind)) {
    throw new Error("User Not Found!");
  }
}

function checkIfPostExists(postToFind: string, db: DB) {
  if (!db.posts.some((post) => post?.id === postToFind && post?.published)) {
    throw new Error("Post Not Found!");
  }
}

function findIndexOfItem(itemId: string, data: Array<any>, itemType: string) {
  const itemIndex = data.findIndex((ele) => ele.id === itemId);
  if (itemIndex === -1) {
    throw new Error(`${itemType} Not Found!`);
  }
  return itemIndex;
}

export { checkIfUserExists, checkIfPostExists, findIndexOfItem };
