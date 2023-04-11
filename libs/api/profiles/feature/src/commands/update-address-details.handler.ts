// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdateAddressDetailsResponse,
//     UpdateAddressDetailsCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdateAddressDetailsCommand)
// export class UpdateAddressDetailsHandler
//   implements
//     ICommandHandler<UpdateAddressDetailsCommand, IUpdateAddressDetailsResponse>
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdateAddressDetailsCommand) {
//     console.log(`${UpdateAddressDetailsHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     if (!request.profile.addressDetails)
//       throw new Error('Profile address details not found');
//     profile.updateAddressDetails(request.profile.addressDetails);
//     profile.commit();

//     const response: IUpdateAddressDetailsResponse = { profile };
//     return response;
//   }
// }
