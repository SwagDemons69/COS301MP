import { user_profile } from "../interfaces"

export interface addFollowerRequest{
    notification_id?: string;
    requester : user_profile,
    requestee : user_profile
}