import { user_profile } from '../interfaces';

export class ProfileCreatedEvent {
  constructor(public readonly profile: user_profile) {}
}
