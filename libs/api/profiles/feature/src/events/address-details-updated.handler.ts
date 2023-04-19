// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { AddressDetailsUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(AddressDetailsUpdatedEvent)
// export class AddressDetailsUpdatedHandler
//   implements IEventHandler<AddressDetailsUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: AddressDetailsUpdatedEvent) {
//     console.log(`${AddressDetailsUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
