import { edit_profile } from "../interfaces";

export interface EditProfileRequest {
    user_id : string;
    profile : edit_profile;
}