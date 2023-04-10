export interface post {
    post_id : string;
    user_id : string;
    content : string;
    caption : string | null | undefined;
    likes : number;
    timeStamp : number;
    shares : number;
    kronos : number;
    comments : string[];
    categories : string[];
    taggedUsers : string[];
}