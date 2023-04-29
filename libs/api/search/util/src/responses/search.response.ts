import { post } from '@mp/api/home/util';
import { user_profile } from '@mp/api/profiles/util';

export interface User {
    user: user_profile;
    posts: post[];
}
export interface Post {
    post: post;
    posted_by: string;
}

export interface SearchResponse {
    profiles: User[];
    posts: Post[];
}
