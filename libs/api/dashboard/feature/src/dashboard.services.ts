import {
  GetBlipContentQuery,
  GetBlipContentRequest,
    GetBlipContentResponse,
    GetRecommendedPostsCommand,
    GetRecommendedPostsRequest,
    GetRecommendedPostsResponse,
    GetTrendingPostsCommand,
    GetTrendingPostsRequest,
    GetTrendingPostsResponse,
} from '@mp/api/dashboard/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class DashboardServices {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  async GetRecommendedPosts(request: GetRecommendedPostsRequest): Promise<GetRecommendedPostsResponse> {
    return await this.commandBus.execute<GetRecommendedPostsCommand, GetRecommendedPostsResponse>(new GetRecommendedPostsCommand(request));
  }

  async GetTrendingPosts(request: GetTrendingPostsRequest): Promise<GetTrendingPostsResponse> {
    return await this.commandBus.execute<GetTrendingPostsCommand, GetTrendingPostsResponse>(new GetTrendingPostsCommand(request));
  }

  async GetBlipContent(request: GetBlipContentRequest): Promise<GetBlipContentResponse> {
    return await this.queryBus.execute<GetBlipContentQuery, GetBlipContentResponse>(new GetBlipContentQuery(request));
  }
}
