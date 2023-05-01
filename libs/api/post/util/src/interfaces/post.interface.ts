export interface post {
    post_id : string;
    user_id : string;
    content : string;
    caption : string;
    likes : number;
    dislikes : number;
    timeStamp : number;
    shares : number;
    kronos : number;
    comments : number;
    categories : string[];
    taggedUsers : string[]
}