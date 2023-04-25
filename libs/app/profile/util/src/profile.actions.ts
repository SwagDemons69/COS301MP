import { edit_profile, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util';
export class Logout {
  static readonly type = '[Profile] Logout';
}

export class SubscribeToProfile {
  static readonly type = '[Profile] SubscribeToProfile';
}

export class SubscribeToProfilePosts {
  static readonly type = '[Profile] SubscribeToProfilePosts';
}

export class SetProfile {
  static readonly type = '[Profile] SetProfile';
  constructor(public readonly profile: user_profile | null) { }
}

export class SetPosts {
  static readonly type = '[Profile] SetPosts';
  constructor(public readonly posts: post | null) { }
}

export class EditProfile {
  static readonly type = '[Profile] EditProfile';
}

export class InitForm {
  static readonly type = '[Profile] InitForm';
  constructor(public readonly form: edit_profile | null) { }
}

export class GetImages {
  static readonly type = '[Profile] GetImages';
  constructor(public readonly images: string[] | []) { }
}

//========================================================

export class UpdateAccountDetails {
  static readonly type = '[Profile] UpdateAccountDetails';
}

export class UpdateAddressDetails {
  static readonly type = '[Profile] UpdateAddressDetails';
}

export class UpdateContactDetails {
  static readonly type = '[Profile] UpdateContactDetails';
}

export class UpdateOccupationDetails {
  static readonly type = '[Profile] UpdateOccupationDetails';
}

export class UpdatePersonalDetails {
  static readonly type = '[Profile] UpdatePersonalDetails';
}


export class LoadProfile {
  static readonly type = '[Profile] LoadProfile';
}
