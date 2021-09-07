import { PostsElement, UsersElement, CommentsElement, Context } from "../types";

export default {
  Query: {
    posts(parent: any, args: any, { db }: Context, info: any) {
      if (args.query) {
        const query = args.query.toLowerCase();
        return db.posts.filter((post: PostsElement) => {
          const isTitleMatch = post?.title.toLowerCase().includes(query);
          const isBodyMatch = post?.body.toLowerCase().includes(query);
          return isTitleMatch || isBodyMatch;
        });
      }
      return db.posts;
    },
  },
  Mutation: {
    createPost(
      parent: any,
      args: any,
      { db, checkIfUserExists, uuidv1 }: Context,
      info: any
    ) {
      checkIfUserExists(args.data.author, db);
      const post = {
        id: uuidv1(),
        ...args.data,
      };
      db.posts.push(post);
      return post;
    },
    deletePost(parent: any, args: any, { db, findIndexOfItem }: Context, info: any) {
      const postIndex = findIndexOfItem(args.id, db.posts, "Post");
      const deletedPost = db.posts.splice(postIndex, 1)[0];
      db.comments = db.comments.filter(
        (comment: CommentsElement) => comment?.post !== args.id
      );
      return deletedPost;
    },
  },
  Post: {
    // parent = a post
    author(parent: any, args: any, { db }: Context, info: any) {
      return db.users.find((user: UsersElement) => user?.id === parent.author);
    },
    comments(parent: any, args: any, { db }: Context, info: any) {
      return db.comments.filter(
        (comment: CommentsElement) => comment?.post === parent.id
      );
    },
  },
};
