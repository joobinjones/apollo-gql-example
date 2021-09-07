interface CreateCommentInput {
  text: string;
  author: string;
  post: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  post: string;
}

type CommentsElement = Comment | undefined | null;
type Comments = Array<CommentsElement>;

export { CreateCommentInput, Comment, Comments, CommentsElement };
