import { user_profile } from '../interfaces';

export class EditProfileEvent {
  constructor(public readonly profile: user_profile) {}
}
