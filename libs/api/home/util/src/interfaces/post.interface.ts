export interface post {
    post_id: string;
    user_id: string;
    title: string;
    content: string;
    desc: string;
    likes: number;
    timeStamp: number;
    shares: number;
    kronos: number;
    comments: number;
    tags: string[];
    taggedUsers: string[];
}