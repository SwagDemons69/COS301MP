// import { ProfilesRepository } from '@mp/api/profiles/data-access';
// import {
//     DisplayProfileResponse,
//     DisplayProfileQuery
// } from '@mp/api/profiles/util';
// import { QueryHandler, IQueryHandler, IQueryPublisher } from '@nestjs/cqrs';
// //import { user_profile } from '../models';

// @QueryHandler(DisplayProfileQuery)
// export class DisplayProfileQueryHandler implements IQueryHandler<DisplayProfileQuery, DisplayProfileResponse>
// {
//   constructor(
//     private readonly publisher: IQueryPublisher,
//     private readonly repository: ProfilesRepository
//   ) {}

//  async execute(query: DisplayProfileQuery) {
//     console.log(`${DisplayProfileQueryHandler.name}`);

//     const request = query.request;
//     const profileDoc = await this.repository.findOne(request.profiles);
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
//  }
// }