export interface GetProfileStatsResponse {
    followers: string[],
    following: string[],
    followRequests: user[]
}

interface user {
    user: string;
    image: string;
}