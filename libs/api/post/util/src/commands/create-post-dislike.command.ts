import { CreatePostLikeRequest } from "../requests";

export class CreatePostDislikeCommand{
    constructor(public readonly request: CreatePostLikeRequest) {}
}