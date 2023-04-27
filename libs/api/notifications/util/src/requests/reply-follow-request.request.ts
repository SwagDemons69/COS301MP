// This is an interface for a request that replies to follow requests
export interface ReplyFollowRequest {
    followRequestId: string;
    accepted: boolean;
}