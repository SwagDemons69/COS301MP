import { CreatePostRootCommentRequest } from "../requests";
export class CreatePostRootCommentCommand{
    constructor(public readonly request: CreatePostRootCommentRequest) {}
}