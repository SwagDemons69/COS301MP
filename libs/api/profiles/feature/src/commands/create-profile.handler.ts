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
    //console.log("@@@@@@@@@@@@@@@@@@@@@@@@")


    const request = command.request;
    const userId = request.user.id;
    const displayName = request.user.displayName;
    const email = request.user.email;
    const photoURL = request.user.photoURL;
    const cellphone = request.user.phoneNumber;

    let temp = "";
    let tempEmail = ""
    if(!displayName){
       temp = "";
    }
    else{
      temp = displayName;
    }
    if(!email){
      tempEmail = "";
    }
    else{
      tempEmail = email;
    }

    const data: user_profile = {
      user_id: userId,
      timeOfExpiry: 420,
      notPublic: "false",
      username: temp,
      name: temp,
      profilePicturePath: "https://ionicframework.com/docs/img/demos/avatar.svg",
      bio: "",
      email: tempEmail,
      password: "",
      province: "",
      likesLeft: 10,
      dislikesLeft: 10,
      commentLikesLeft: 10,
      followers: [], //Array of user_id
      following: [], //Array of user_id
      blocked: [],    //Array of user_id
      posts: [],  //Array of post_id
      notifications: [] //Array of notification_id
    }


    const profile = this.publisher.mergeObjectContext(Profile.fromData(data));
    
    //console.log(profile)

    profile.create();
    profile.commit();
  }
}
