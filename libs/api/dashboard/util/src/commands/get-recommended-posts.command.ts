import { GetRecommendedPostsRequest } from "../requests";
export class GetRecommendedPostsCommand {
    constructor(public readonly request: GetRecommendedPostsRequest ) {}
}