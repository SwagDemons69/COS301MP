// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { PersonalDetailsUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(PersonalDetailsUpdatedEvent)
// export class PersonalDetailsUpdatedHandler
//   implements IEventHandler<PersonalDetailsUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: PersonalDetailsUpdatedEvent) {
//     console.log(`${PersonalDetailsUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
