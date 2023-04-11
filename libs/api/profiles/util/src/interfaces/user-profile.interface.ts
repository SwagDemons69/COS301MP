export interface user_profile {
    user_id : string;
    timeOfExpiry: number;
    notPublic : string;
    username : string | null | undefined;
    name : string | null | undefined;
    profilePicturePath : string | null | undefined;
    bio : string | null | undefined;
    email : string | null | undefined;
    password : string;
    province : string | null | undefined;
    likesLeft : number | null | undefined;
    dislikesLeft : number | null | undefined;
    commentLikesLeft : number | null | undefined;
    followers :  string[] | null | undefined; //Array of UserId
    following : string[] | null | undefined; //Array of UserId
    posts : string[] | null | undefined;  //Array of PostId
    blocked : string[] | null | undefined;
    notifications : string[] | null | undefined;
};


//friendRequests