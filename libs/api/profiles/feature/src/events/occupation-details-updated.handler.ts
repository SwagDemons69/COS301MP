// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { OccupationDetailsUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(OccupationDetailsUpdatedEvent)
// export class OccupationDetailsUpdatedHandler
//   implements IEventHandler<OccupationDetailsUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: OccupationDetailsUpdatedEvent) {
//     console.log(`${OccupationDetailsUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
