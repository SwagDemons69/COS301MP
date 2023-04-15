import { ProfileCreatedEvent, user_profile } from '@mp/api/profiles/util';
import { AggregateRoot } from '@nestjs/cqrs';
import { post } from '@mp/api/home/util'

export class Profile extends AggregateRoot implements user_profile {
  constructor(
    public user_id: string,
    public timeOfExpiry: number,
    public notPublic: string,
    public username: string | null | undefined,
    public name: string | null | undefined,
    public profilePicturePath: string | null | undefined,
    public bio: string | null | undefined,
    public email: string | null | undefined,
    public password: string,
    public province: string | null | undefined,
    public likesLeft: number | null | undefined,
    public dislikesLeft: number | null | undefined,
    public commentLikesLeft: number | null | undefined,
    public followers: string[] | null | undefined, //Array of UserId
    public following: string[] | null | undefined, //Array of UserId
    public posts: post[] | null | undefined,  //Array of PostId
    public blocked: string[] | null | undefined,
    public notifications: string[] | null | undefined,
    public followRequests: string[] | null | undefined
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
      profile.notifications,
      profile.followRequests
    );
    return instance;
  }

  create() {
    this.apply(new ProfileCreatedEvent(this.toJSON()));
  }

  // updateAddressDetails(addressDetails: IAddressDetails) {
  //   if (!this.addressDetails) this.addressDetails = {};
  //   this.addressDetails.residentialArea = addressDetails.residentialArea
  //     ? addressDetails.residentialArea
  //     : this.addressDetails.residentialArea;
  //   this.addressDetails.workArea = addressDetails.workArea
  //     ? addressDetails.workArea
  //     : this.addressDetails.workArea;
  //   this.apply(new AddressDetailsUpdatedEvent(this.toJSON()));
  // }

  // updateContactDetails(contactDetails: IContactDetails) {
  //   if (!this.contactDetails) this.contactDetails = {};
  //   this.contactDetails.cellphone = contactDetails.cellphone
  //     ? contactDetails.cellphone
  //     : this.contactDetails.cellphone;
  //   this.apply(new ContactDetailsUpdatedEvent(this.toJSON()));
  // }

  // updatePersonalDetails(personalDetails: IPersonalDetails) {
  //   if (!this.personalDetails) this.personalDetails = {};
  //   this.personalDetails.age = personalDetails.age
  //     ? personalDetails.age
  //     : this.personalDetails.age;
  //   this.personalDetails.gender = personalDetails.gender
  //     ? personalDetails.gender
  //     : this.personalDetails.gender;
  //   this.personalDetails.ethnicity = personalDetails.ethnicity
  //     ? personalDetails.ethnicity
  //     : this.personalDetails.ethnicity;
  //   this.apply(new PersonalDetailsUpdatedEvent(this.toJSON()));
  // }

  // updateOccupationDetails(occupationDetails: IOccupationDetails) {
  //   if (!this.occupationDetails) this.occupationDetails = {};
  //   this.occupationDetails.householdIncome = occupationDetails.householdIncome
  //     ? occupationDetails.householdIncome
  //     : this.occupationDetails.householdIncome;
  //   this.occupationDetails.occupation = occupationDetails.occupation
  //     ? occupationDetails.occupation
  //     : this.occupationDetails.occupation;
  //   this.apply(new OccupationDetailsUpdatedEvent(this.toJSON()));
  // }

  // updateAccountDetails(accountDetails: IAccountDetails) {
  //   if (!this.accountDetails) this.accountDetails = {};
  //   this.accountDetails.displayName = accountDetails.displayName
  //     ? accountDetails.displayName
  //     : this.accountDetails.displayName;
  //   this.accountDetails.email = accountDetails.email
  //     ? accountDetails.email
  //     : this.accountDetails.email;
  //   this.accountDetails.photoURL = accountDetails.photoURL
  //     ? accountDetails.photoURL
  //     : this.accountDetails.photoURL;
  //   this.accountDetails.password = accountDetails.password
  //     ? accountDetails.password
  //     : this.accountDetails.password;
  //   this.apply(new AccountDetailsUpdatedEvent(this.toJSON()));
  // }

  // private updateAccountDetailsStatus() {
  //   if (!this.accountDetails) {
  //     this.accountDetails = {};
  //     this.accountDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   if (!this.accountDetails.displayName || !this.accountDetails.email) {
  //     this.accountDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   this.accountDetails.status = ProfileStatus.COMPLETE;
  //   return;
  // }

  // private updateAddressDetailsStatus() {
  //   if (!this.addressDetails) {
  //     this.addressDetails = {};
  //     this.addressDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   if (!this.addressDetails.residentialArea || !this.addressDetails.workArea) {
  //     this.addressDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   this.addressDetails.status = ProfileStatus.COMPLETE;
  //   return;
  // }

  // private updateContactDetailsStatus() {
  //   if (!this.contactDetails) {
  //     this.contactDetails = {};
  //     this.contactDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   if (!this.contactDetails.cellphone) {
  //     this.contactDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   this.contactDetails.status = ProfileStatus.COMPLETE;
  //   return;
  // }

  // private updatePersonalDetailsStatus() {
  //   if (!this.personalDetails) {
  //     this.personalDetails = {};
  //     this.personalDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   if (
  //     !this.personalDetails.age ||
  //     !this.personalDetails.gender ||
  //     !this.personalDetails.ethnicity
  //   ) {
  //     this.personalDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   this.personalDetails.status = ProfileStatus.COMPLETE;
  //   return;
  // }

  // private updateOccupationDetailsStatus() {
  //   if (!this.occupationDetails) {
  //     this.occupationDetails = {};
  //     this.occupationDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   if (
  //     !this.occupationDetails.householdIncome ||
  //     !this.occupationDetails.occupation
  //   ) {
  //     this.occupationDetails.status = ProfileStatus.INCOMPLETE;
  //     this.status = ProfileStatus.INCOMPLETE;
  //     return;
  //   }

  //   this.occupationDetails.status = ProfileStatus.COMPLETE;
  //   return;
  // }

  // updateStatus() {
  //   this.updateAccountDetailsStatus();
  //   this.updateAddressDetailsStatus();
  //   this.updateContactDetailsStatus();
  //   this.updatePersonalDetailsStatus();
  //   this.updateOccupationDetailsStatus();

  //   if (
  //     this.accountDetails?.status === ProfileStatus.COMPLETE &&
  //     this.addressDetails?.status === ProfileStatus.COMPLETE &&
  //     this.contactDetails?.status === ProfileStatus.COMPLETE &&
  //     this.personalDetails?.status === ProfileStatus.COMPLETE &&
  //     this.occupationDetails?.status === ProfileStatus.COMPLETE
  //   ) {
  //     this.status = ProfileStatus.COMPLETE;
  //   }

  //   this.apply(new ProfileStatusUpdatedEvent(this.toJSON()));
  // }

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
      notifications: this.notifications,
      followRequests: this.followRequests
    };
  }
}