// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdateContactDetailsResponse,
//     UpdateContactDetailsCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdateContactDetailsCommand)
// export class UpdateContactDetailsHandler
//   implements
//     ICommandHandler<UpdateContactDetailsCommand, IUpdateContactDetailsResponse>
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdateContactDetailsCommand) {
//     console.log(`${UpdateContactDetailsHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     if (!request.profile.contactDetails)
//       throw new Error('Profile contact details not found');
//     profile.updateContactDetails(request.profile.contactDetails);
//     profile.commit();

//     const response: IUpdateContactDetailsResponse = { profile };
//     return response;
//   }
// }
