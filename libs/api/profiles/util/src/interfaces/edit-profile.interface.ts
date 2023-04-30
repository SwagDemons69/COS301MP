export interface edit_profile {
    notPublic : boolean;
    name : string | null;
    username : string;
    profilePicturePath : string;
    bio : string | null | undefined;
    province : string | null | undefined;
}