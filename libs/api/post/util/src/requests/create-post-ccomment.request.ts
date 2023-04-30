import { ChildComment } from "../interfaces";

export interface CreatePostChildCommentRequest{
    user_id: string;
    post_id: string;
    root_comment_id: string;
    comment : ChildComment;
}