import { post_like, RootComment } from "@mp/api/post/util";

export interface GetBlipContentResponse{
    username: string;
    imageURL: string;
    likes   : post_like[];
    comments : RootComment[];
}