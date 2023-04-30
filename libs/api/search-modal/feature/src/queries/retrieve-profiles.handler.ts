import { SearchModalRepository } from '@mp/api/search-modal/data-access';
import { RetrieveProfilesQuery, RetrieveProfilesResponse, RetrieveProfilesRequest } from '@mp/api/search-modal/util';
import { CommandHandler, EventPublisher, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@QueryHandler(RetrieveProfilesQuery)
export class RetrieveProfilesQueryHandler
  implements
    IQueryHandler<RetrieveProfilesQuery, RetrieveProfilesResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: SearchModalRepository
  ) {}

  async execute(command: RetrieveProfilesQuery) {
    console.log(`${RetrieveProfilesQueryHandler.name}`);
    const request = command.request;
    return await this.repository.retrieveProfiles(request.user)
  }
}