// import { IProfile } from '@mp/api/profiles/util';
// import { post } from '@mp/api/post/util';
import { user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util';

// export interface User{
//     name    : string;
//     bio    : string;
//     photoURL : string;
//     profileId : string;
//     email : string;
// }
export interface Post{
    post : post;
    posted_by : string;
}

export interface SearchResponse {
    profiles: user_profile[];
    posts: Post[];
}
