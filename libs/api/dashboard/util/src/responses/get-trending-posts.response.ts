import { post } from "@mp/api/home/util";

import { PostHeader } from "../interfaces";

export interface GetTrendingPostsResponse {
    posts: PostHeader[];
}