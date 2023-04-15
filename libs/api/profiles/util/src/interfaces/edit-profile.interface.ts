export interface edit_profile {
    notPublic : string;
    name : string | null;
    username : string | null;
    profilePicturePath : string | null | undefined;
    bio : string | null | undefined;
    province : string | null | undefined;
}