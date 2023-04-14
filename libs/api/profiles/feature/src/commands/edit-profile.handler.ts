import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { EditProfileCommand, EditProfileResponse } from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';

@CommandHandler(EditProfileCommand)
export class EditProfileCommandHandler
  implements
    ICommandHandler<EditProfileCommand, EditProfileResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ProfilesRepository
  ) {}

  async execute(command: EditProfileCommand) {
    console.log(`${EditProfileCommandHandler.name}`);
    
    //Get user in firestore and wrap in user_profile interface
    const request = command.request;
    console.log("REQUEST IN HANDLER BELOW")
    console.log(request.user_id)
    const profileDoc = await this.repository.findUser(request.user_id);
    const profileData = profileDoc.data();

    if (!profileData) throw new Error('Profile not found');

    //Add new Profile object context (with passwed in user data from profileDoc) to publisher
    const profile = this.publisher.mergeObjectContext(
      Profile.fromData(profileData)
    );


    if (!request.profile)
      throw new Error('New Profile Fields Not Found');
    
    //Change data if user entered new values
    profile.EditProfile(request.profile);
    //Create ProfileEditEvent
    profile.edit();
    profile.commit();

    const response: EditProfileResponse = { profile };
    return response;
  }
}