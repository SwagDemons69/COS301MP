import { RootComment } from "../interfaces";

export interface CreatePostRootCommentRequest{
    user_id: string;
    post_id: string;
    comment: RootComment;
}