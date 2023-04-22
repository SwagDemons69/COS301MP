// import { IProfile } from '@mp/api/profiles/util';
// import { post } from '@mp/api/post/util';

export interface User{
    name    : string;
    bio    : string;
    photoURL : string;
    profileId : string;
}
export interface Post{
    content : string;
    caption : string;
    postId : string;
    profileId : string;
}

export interface SearchResponse {
    profiles: User[];
    posts: Post[];
}
