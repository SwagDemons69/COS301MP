import { contact } from "./contact.interface";

export interface contacts{
    user_id: string;
    following: contact [] | null | undefined;
    followers: contact [] | null | undefined;
}