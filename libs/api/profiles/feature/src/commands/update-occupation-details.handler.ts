// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdateOccupationDetailsResponse,
//     UpdateOccupationDetailsCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdateOccupationDetailsCommand)
// export class UpdateOccupationDetailsHandler
//   implements
//     ICommandHandler<
//       UpdateOccupationDetailsCommand,
//       IUpdateOccupationDetailsResponse
//     >
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdateOccupationDetailsCommand) {
//     console.log(`${UpdateOccupationDetailsHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     if (!request.profile.occupationDetails)
//       throw new Error('Profile occupation details not found');
//     profile.updateOccupationDetails(request.profile.occupationDetails);
//     profile.commit();

//     const response: IUpdateOccupationDetailsResponse = { profile };
//     return response;
//   }
// }
