import { user_profile } from "../interfaces"

export interface addFollowerRequest{
    requester : user_profile,
    requestee : user_profile
}