import { post } from '@mp/api/home/util'

export interface user_profile {
    user_id : string;
    timeOfExpiry: number;
    notPublic : string;
    username : string;
    name : string | null | undefined;
    profilePicturePath : string;
    bio : string | null | undefined;
    email : string;
    password : string;
    province : string | null | undefined;
    likesLeft : number | null | undefined;
    dislikesLeft : number | null | undefined;
    commentLikesLeft : number | null | undefined;
    followers :  number; //Array of UserId
    following : number; //Array of UserId
    posts : number;  //Array of Posts
    blocked : number;
    notifications : string[] | null | undefined;
};


//friendRequests