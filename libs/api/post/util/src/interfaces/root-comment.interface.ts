import { ChildComment } from "./child-comment.interface";
export interface RootComment {
    "root_comment_id": string;
    "created_by": string;
    "created_by_username": string;
    "content": string; 
    "kronos" : number;
    "likes": number;
    "comments": ChildComment[],
}