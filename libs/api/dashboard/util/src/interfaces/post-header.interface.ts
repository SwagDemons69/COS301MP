import { post } from "@mp/api/home/util";

export interface PostHeader{
    post: postData
    user: userData
    timeStamp: number
    postData: post
}

export interface postData{
    title: string;
    content: string;
    desc: string; 
    likes: number;
    shares: number;
    comments: number;
}

export interface userData{
    user_id: string;
    username: string;
    image: string;
}