import { user_profile } from '@mp/api/profiles/util';

export interface addFollowerRequest{
    requester : user_profile,
    requestee : user_profile
}