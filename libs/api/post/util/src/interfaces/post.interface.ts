export interface post {
    post_id : string;
    user_id : string;
    content : string;
    caption : string;
    likes : string[];
    timeStamp : number;
    shares : number;
    kronos : number;
    comments : string[];
    categories : string[];
    taggedUsers : string[]
}