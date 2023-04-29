import { edit_profile, ProfileCreatedEvent, user_profile, EditProfileEvent } from '@mp/api/profiles/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { post } from '@mp/api/home/util'

export class Profile extends AggregateRoot implements user_profile {
  constructor(
    public user_id: string,
    public timeOfExpiry: number,
    public notPublic: string,
    public username: string ,
    public name: string | null | undefined,
    public profilePicturePath: string,
    public bio: string | null | undefined,
    public email: string,
    public password: string,
    public province: string | null | undefined,
    public likesLeft: number | null | undefined,
    public dislikesLeft: number | null | undefined,
    public commentLikesLeft: number | null | undefined,
    public followers: number, //Array of UserId
    public following: number, //Array of UserId
    public posts: number,  //Array of PostId
    public blocked: number,
    public notifications: string[] | null | undefined
  ) {
    super();
  }

  static fromData(profile: user_profile): Profile {
    const instance = new Profile(
      profile.user_id,
      profile.timeOfExpiry,
      profile.notPublic,
      profile.username,
      profile.name,
      profile.profilePicturePath,
      profile.bio,
      profile.email,
      profile.password,
      profile.province,
      profile.likesLeft,
      profile.dislikesLeft,
      profile.commentLikesLeft,
      profile.followers,
      profile.following,
      profile.posts,
      profile.blocked,
      profile.notifications
    );
    return instance;
  }

  create() {
    this.apply(new ProfileCreatedEvent(this.toJSON()));
  }

  edit(){
    this.apply(new EditProfileEvent(this.toJSON()));
  }

  EditProfile(profile : edit_profile) {
    this.notPublic = (profile.notPublic == "DO-NOT-MODFIY") ? this.notPublic : profile.notPublic;
    this.name = (profile.name == "DO-NOT-MODFIY") ? this.name : profile.name;
    this.username = (profile.username == "DO-NOT-MODFIY") ? this.username : profile.username;
    this.profilePicturePath = (profile.profilePicturePath == "DO-NOT-MODFIY") ? this.profilePicturePath : profile.profilePicturePath;
    this.bio = (profile.bio == "DO-NOT-MODFIY") ? this.bio : profile.bio;
    this.province = (profile.province == "DO-NOT-MODFIY") ? this.province : profile.province;
  }

  toJSON(): user_profile {
    return {
      user_id: this.user_id,
      timeOfExpiry: this.timeOfExpiry,
      notPublic: this.notPublic,
      username: this.username,
      name: this.name,
      profilePicturePath: this.profilePicturePath,
      bio: this.bio,
      email: this.email,
      password: this.password,
      province: this.province,
      likesLeft: this.likesLeft,
      dislikesLeft: this.dislikesLeft,
      commentLikesLeft: this.commentLikesLeft,
      followers: this.followers,
      following: this.following,
      posts: this.posts,
      blocked: this.blocked,
      notifications: this.notifications
    };
  }
}