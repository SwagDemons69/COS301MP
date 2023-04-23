import { 
    RetrieveProfilesRequest,
    RetrieveProfilesResponse,
    RetrieveProfilesQuery
     } from '@mp/api/search-modal/util';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
    
@Injectable()
export class SearchModalService {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

    async retrieveProfiles(request: RetrieveProfilesRequest): Promise<RetrieveProfilesResponse> {
        return await this.queryBus.execute<RetrieveProfilesQuery, RetrieveProfilesResponse>(new RetrieveProfilesQuery(request));
    }
}
      