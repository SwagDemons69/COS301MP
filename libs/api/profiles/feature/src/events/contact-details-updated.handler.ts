// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { ContactDetailsUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(ContactDetailsUpdatedEvent)
// export class ContactDetailsUpdatedHandler
//   implements IEventHandler<ContactDetailsUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: ContactDetailsUpdatedEvent) {
//     console.log(`${ContactDetailsUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
