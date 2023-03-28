import {
  CreateProfileCommand, user_profile
} from '@mp/api/profiles/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Profile } from '../models';
//import { user_profile } from '@mp/api/profiles/util';

@CommandHandler(CreateProfileCommand)
export class CreateProfileHandler
  implements ICommandHandler<CreateProfileCommand>
{
  constructor(private publisher: EventPublisher) { }

  async execute(command: CreateProfileCommand) {
    console.log(`${CreateProfileHandler.name}`);

    const request = command.request;
    const userId = request.user.id;
    const displayName = request.user.displayName;
    const email = request.user.email;
    const photoURL = request.user.photoURL;
    const cellphone = request.user.phoneNumber;

    const data: user_profile = {
      user_id: userId,
      time_of_expiry: 420,
      non_public: "false",
      user_name: displayName,
      name_and_surname: displayName,
      user_profile_photo: photoURL,
      user_bio: "",
      passwordHash: "",
      province: "",
      following_count: 0,
      follower_count: 0,
      followers: [], //Array of UserId
      following: [], //Array of UserId
      blocked_users: [],
      post_count: 0,
      posts: [],  //Array of PostId
      likes_for_day: 0,
      dislikes_for_day: 0,
      comments_for_day: 0,
      notifications: []
    }


    const profile = this.publisher.mergeObjectContext(Profile.fromData(data));

    profile.create();
    profile.commit();
  }
}
