// import { IProfile } from '@mp/api/profiles/util';
// import { post } from '@mp/api/post/util';

interface user{
    name    : string;
    bio    : string;
    photoURL : string;
    profileId : string;
}
interface post{
    content : string;
    caption : string;
    postId : string;
    profileId : string;
}

export interface SearchResponse {
    profiles: user[];
    posts: post[];
}
