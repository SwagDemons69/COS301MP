import { user_profile } from "@mp/api/profiles/util";

export interface GetGraveyardResponse{
    profiles: user_profile[];
}