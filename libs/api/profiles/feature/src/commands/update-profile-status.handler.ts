// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     IUpdateProfileStatusResponse,
//     UpdateProfileStatusCommand
// } from '@mp/api/profiles/util';
// import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
// import { Profile } from '../models';

// @CommandHandler(UpdateProfileStatusCommand)
// export class UpdateProfileStatusHandler
//   implements ICommandHandler<UpdateProfileStatusCommand>
// {
//   constructor(
//     private readonly publisher: EventPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//   async execute(command: UpdateProfileStatusCommand) {
//     console.log(`${UpdateProfileStatusHandler.name}`);

//     const request = command.request;
//     const profileDoc = await this.repository.findOne(request.profile);
//     const profileData = profileDoc.data();

//     if (!profileData) throw new Error('Profile not found');

//     const profile = this.publisher.mergeObjectContext(
//       Profile.fromData(profileData)
//     );

//     profile.updateStatus();
//     profile.commit();

//     const response: IUpdateProfileStatusResponse = { profile };
//     return response;
//   }
// }
