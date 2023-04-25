// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { ProfileStatusUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(ProfileStatusUpdatedEvent)
// export class ProfileStatusUpdatedHandler
//   implements IEventHandler<ProfileStatusUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: ProfileStatusUpdatedEvent) {
//     console.log(`${ProfileStatusUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
