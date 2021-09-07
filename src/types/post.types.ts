interface CreatePostInput {
  title: string;
  body: string;
  published: boolean;
  author: string;
}

interface Post {
  id: string;
  title: string;
  body: string;
  published: boolean;
  author: string;
}

type PostsElement = Post | undefined | null;
type Posts = Array<PostsElement>;

export { CreatePostInput, Post, Posts, PostsElement };
