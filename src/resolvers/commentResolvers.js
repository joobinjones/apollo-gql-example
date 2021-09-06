export default {
  Query: {
    comments(parent, args, { db }, info) {
      if (args.query) {
        return db.comments.filter((comment) =>
          comment.text.toLowerCase().includes(args.query.toLowerCase())
        );
      }
      return db.comments;
    },
  },
  Mutation: {
    createComment(
      parent,
      args,
      { db, checkIfUserExists, checkIfPostExists, uuidv1 },
      info
    ) {
      checkIfUserExists(args.data.author);
      checkIfPostExists(args.data.post);

      const comment = {
        id: uuidv1(),
        ...args.data,
      };
      db.comments.push(comment);
      return comment;
    },
    deleteComment(parent, args, { db, findIndexOfItem }, info) {
      const commentIndex = findIndexOfItem(args.id, db.comments, "Comment");
      const deletedComment = db.comments.splice(commentIndex, 1)[0];
      return deletedComment;
    },
  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    post(parent, args, { db }, info) {
      return db.posts.find((post) => post.id === parent.post);
    },
  },
};
