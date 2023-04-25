import { CreatePostChildCommentRequest } from "../requests";
export class CreatePostChildCommentCommand{
    constructor(public readonly request: CreatePostChildCommentRequest) {}
}