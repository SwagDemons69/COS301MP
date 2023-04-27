import { user } from '@mp/api/search/data-access'


export interface GetProfileStatsResponse{
    followers: string[],
    following: string[],
    followRequests : user[]
}