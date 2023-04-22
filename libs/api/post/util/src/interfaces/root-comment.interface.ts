import { ChildComment } from "./child-comment.interface";
export interface RootComment {
    "root_comment_id": string;
    "created_by": string;
    "content": string; 
    "kronos" : number;
    "likes": number;
    "comments": ChildComment[],
}