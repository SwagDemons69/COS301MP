import { SearchRequest, SearchResponse} from '@mp/api/search/util';
import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { SearchQuery} from '@mp/api/search/util'
@Injectable()
export class SearchService {
  constructor(private readonly queryBus: QueryBus) {}

    async search(request: SearchRequest): Promise<SearchResponse> {
        return await this.queryBus.execute<SearchQuery, SearchResponse>(new SearchQuery(request));
    }
}

