export interface post {
    post_id : string;
    user_id : string;
    title   : string;
    content : string;
    desc : string;
    likes : string[];
    timeStamp : number;
    shares : number;
    kronos : number;
    comments : string[];
    tags : string[];
    taggedUsers : string[];
}