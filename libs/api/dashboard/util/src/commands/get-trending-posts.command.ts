import { GetTrendingPostsRequest } from '../requests';

export class GetTrendingPostsCommand {
    constructor(public readonly request: GetTrendingPostsRequest ) {}
}