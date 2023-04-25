// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import { AccountDetailsUpdatedEvent } from '@mp/api/profiles/util';
// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// @EventsHandler(AccountDetailsUpdatedEvent)
// export class AccountDetailsUpdatedHandler
//   implements IEventHandler<AccountDetailsUpdatedEvent>
// {
//   constructor(private readonly repository: ProfilesRepository) {}

//   async handle(event: AccountDetailsUpdatedEvent) {
//     console.log(`${AccountDetailsUpdatedHandler.name}`);
//     await this.repository.updateProfile(event.profile);
//   }
// }
