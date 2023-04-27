import { user_profile } from '@mp/api/profiles/util';
import { User } from '@mp/api/search/util'

export interface addFollowerRequest{
    requester : user_profile,
    requestee : User
}