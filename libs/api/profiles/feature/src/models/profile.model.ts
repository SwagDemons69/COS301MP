import { user_profile, ProfileCreatedEvent } from '@mp/api/profiles/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Profile extends AggregateRoot implements user_profile {
  constructor(
    public user_id : string,
    public non_public : string,
    public user_name : string | null | undefined,
    public name_and_surname : string | null | undefined,
    public user_profile_photo : string | null | undefined,
    public user_bio : string | null | undefined,
    public following_count : number | null | undefined,
    public follower_count : number | null | undefined,
    public followers : string[] | null | undefined, //Array of UserId
    public following : string[] | null | undefined, //Array of UserId
    public blocked_users : string[] | null | undefined,
    public post_count : number | null | undefined,
    public posts : string[] | null | undefined,  //Array of PostId
    public likes_for_day : number | null | undefined,
    public dislikes_for_day : number | null | undefined,
    public comments_for_day : number | null | undefined
  ) {
    super();
  }

  static fromData(profile: user_profile): Profile {
    const instance = new Profile(
      profile.user_id,
      profile.non_public,
      profile.user_name,
      profile.name_and_surname,
      profile.user_profile_photo,
      profile.user_bio,
      profile.follower_count,
      profile.follower_count,
      profile.followers,
      profile.following,
      profile.blocked_users,
      profile.post_count,
      profile.posts,
      profile.likes_for_day,
      profile.dislikes_for_day,
      profile.comments_for_day
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
      user_id : this.user_id,
      non_public : this.non_public,
      user_name : this.user_name,
      name_and_surname : this.name_and_surname,
      user_profile_photo : this.user_profile_photo,
      user_bio : this.user_bio,
      following_count : this.following_count,
      follower_count : this.follower_count,
      followers : this.followers,
      following : this.following,
      blocked_users : this.blocked_users,
      post_count : this.post_count,
      posts : this.posts,
      likes_for_day : this.likes_for_day,
      dislikes_for_day : this.dislikes_for_day,
      comments_for_day : this.comments_for_day
    };
  }
}
