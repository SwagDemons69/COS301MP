import { post } from "@mp/api/home/util";

export interface GetRecommendedPostsResponse {
    posts: post[];
}