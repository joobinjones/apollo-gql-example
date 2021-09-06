export default {
  Query: {
    posts(parent, args, { db }, info) {
      if (args.query) {
        const query = args.query.toLowerCase();
        return db.posts.filter((post) => {
          const isTitleMatch = post.title.toLowerCase().includes(query);
          const isBodyMatch = post.body.toLowerCase().includes(query);
          return isTitleMatch || isBodyMatch;
        });
      }
      return db.posts;
    },
  },
  Mutation: {
    createPost(parent, args, { db, checkIfUserExists, uuidv1 }, info) {
      checkIfUserExists(args.data.author);
      const post = {
        id: uuidv1(),
        ...args.data,
      };
      db.posts.push(post);
      return post;
    },
    deletePost(parent, args, { db, findIndexOfItem }, info) {
      const postIndex = findIndexOfItem(args.id, db.posts, "Post");
      const deletedPost = db.posts.splice(postIndex, 1)[0];
      db.comments = db.comments.filter((comment) => comment.post !== args.id);
      return deletedPost;
    },
  },
  Post: {
    // parent = a post
    author(parent, args, { db }, info) {
      return db.users.find((user) => user.id === parent.author);
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter((comment) => comment.post === parent.id);
    },
  },
};
