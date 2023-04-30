import { CreatePostLikeRequest } from "../requests";
export class CreatePostLikeCommand{
    constructor(public readonly request: CreatePostLikeRequest) {}
}