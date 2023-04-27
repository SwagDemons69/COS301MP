import { user_profile } from '../interfaces';

export class EditProfileEvent {
  constructor(public readonly requester: user_profile, public requestee : user_profile) {}
}