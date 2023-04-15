// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdatePersonalDetailsResponse,
//     UpdatePersonalDetailsCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdatePersonalDetailsCommand)
// export class UpdatePersonalDetailsHandler
//   implements
//     ICommandHandler<
//       UpdatePersonalDetailsCommand,
//       IUpdatePersonalDetailsResponse
//     >
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdatePersonalDetailsCommand) {
//     console.log(`${UpdatePersonalDetailsHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     if (!request.profile.personalDetails)
//       throw new Error('Profile personal details not found');
//     profile.updatePersonalDetails(request.profile.personalDetails);
//     profile.commit();

//     const response: IUpdatePersonalDetailsResponse = { profile };
//     return response;
//   }
// }
