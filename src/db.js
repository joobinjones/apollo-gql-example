let users = [
  { id: "1", name: "Austin Jones", email: "austinjones@example.com", age: 24 },
  { id: "2", name: "Andrew Meade", email: "andrew@udemy.com", age: 27 },
  { id: "3", name: "Jane Marie", email: "jane@elmo.com", age: 4 },
  { id: "4", name: "Mia Ann", email: "mia@example.com", age: 1 },
];

let posts = [
  {
    id: "abc123",
    title: "First Post",
    body: "Body of first post.",
    published: true,
    author: "1",
  },
  {
    id: "123abc",
    title: "On the Second World War",
    body: "World War Two was very not good.",
    published: false,
    author: "2",
  },
  {
    id: "def456",
    title: "Post Number Three",
    body: "Huhkay this is the 3rd body.",
    published: false,
    author: "3",
  },
  {
    id: "456def",
    title: "Huhkay Four",
    body: "Alright this is the 4th post.",
    published: true,
    author: "4",
  },
];

let comments = [
  { id: "a", text: "comment one", author: "4", post: "456def" },
  { id: "b", text: "second comment", author: "3", post: "def456" },
  { id: "c", text: "comment number three", author: "1", post: "abc123" },
  { id: "d", text: "fourth and final comment", author: "2", post: "123abc" },
];

export default { users, posts, comments };
