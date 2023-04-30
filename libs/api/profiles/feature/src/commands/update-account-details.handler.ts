// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdateAccountDetailsResponse,
//     UpdateAccountDetailsCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdateAccountDetailsCommand)
// export class UpdateAccountDetailsHandler
//   implements
//     ICommandHandler<UpdateAccountDetailsCommand, IUpdateAccountDetailsResponse>
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdateAccountDetailsCommand) {
//     console.log(`${UpdateAccountDetailsHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     if (!request.profile.accountDetails)
//       throw new Error('Profile account details not found');
//     profile.updateAccountDetails(request.profile.accountDetails);
//     profile.commit();

//     const response: IUpdateAccountDetailsResponse = { profile };
//     return response;
//   }
// }
