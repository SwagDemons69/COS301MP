export interface user_profile {
    user_id : string | null | undefined;
    user_name : string | null | undefined;
    name_and_surname : string | null | undefined;
    user_profile_photo : string | null | undefined;
    user_bio : string | null | undefined;
    following_count : number | null | undefined;
    follower_count : number | null | undefined;
    followers : string[] | null | undefined; //Array of UserId
    following : string[] | null | undefined; //Array of UserId
    post_count : number | null | undefined;
    posts : string[] | null | undefined;  //Array of PostId
    likes_for_day : number | null | undefined;
    dislikes_for_day : number | null | undefined;
    comments_for_day : number | null | undefined;
};


//Blocked Array of Users
//Private flag