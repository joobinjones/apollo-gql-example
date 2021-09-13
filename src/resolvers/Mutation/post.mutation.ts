import { Context, PostsElement, CommentsElement } from "../../types";
import { post } from "../Subscription/post.subscription";

export const postMutations = {
  createPost(
    parent: any,
    args: any,
    { db, findItem, uuidv1, pubsub }: Context,
    info: any
  ) {
    findItem(args.data.author, db.users, "User");
    const post = {
      id: uuidv1(),
      ...args.data,
    };
    db.posts.push(post);
    if (post.published) {
      pubsub.publish("POST", {
        post: {
          mutation: "CREATED",
          data: post,
        },
      });
    }
    return post;
  },
  updatePost(
    parent: any,
    { id, data }: any,
    { db, findItem, pubsub }: Context,
    info: any
  ) {
    const post = findItem(id, db.posts, "Post");
    const originalPost = Object.assign({}, post);
    if (typeof data.title === "string") {
      post!.title = data.title;
    }
    if (typeof data.body === "string") {
      post!.body = data.body;
    }
    if (typeof data.published === "boolean") {
      post!.published = data.published;

      if (originalPost.published && !post.published) {
        // deleted
        pubsub.publish("POST", {
          post: { mutation: "DELETED", data: originalPost },
        });
      } else if (!originalPost.published && post.published) {
        // created
        pubsub.publish("POST", {
          post: {
            mutation: "CREATED",
            data: post,
          },
        });
      }
    } else if (post.published) {
      // updated
      pubsub.publish("POST", {
        post: {
          mutation: "UPDATED",
          data: post,
        },
      });
    }
    return post;
  },
  deletePost(
    parent: any,
    args: any,
    { db, findIndexOfItem, pubsub }: Context,
    info: any
  ) {
    const postIndex = findIndexOfItem(args.id, db.posts, "Post");
    const [post] = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(
      (comment: CommentsElement) => comment?.post !== args.id
    );
    if (post!.published) {
      pubsub.publish("POST", {
        post: {
          mutation: "DELETED",
          data: post,
        },
      });
    }
    return post;
  },
};
