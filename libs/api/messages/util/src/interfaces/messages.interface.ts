import { chats } from "./chats.interface";
import { contacts } from "./contacts.interface";
import {user_profile} from "@mp/api/profiles/util"
export interface user_messages {
    user_profile: user_profile;
    contacts?: contacts;
}