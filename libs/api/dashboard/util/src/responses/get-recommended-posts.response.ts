import { post } from "@mp/api/home/util";
import { PostHeader } from "../interfaces";

export interface GetRecommendedPostsResponse {
    posts: PostHeader[];
}