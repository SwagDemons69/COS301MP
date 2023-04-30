import { user_profile } from '../interfaces';

export interface DisplayProfileResponse {
    flag : string | null | undefined; //Error Meesages
    user_profile : user_profile;
};
