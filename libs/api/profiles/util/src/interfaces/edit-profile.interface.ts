export interface edit_profile {
    notPublic : string;
    name : string | null;
    username : string | null;
    profilePicturePath : string;
    bio : string | null | undefined;
    province : string | null | undefined;
}