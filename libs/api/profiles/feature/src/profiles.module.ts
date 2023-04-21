import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProfileHandler, EditProfileCommandHandler } from './commands';
import { ProfileCreatedHandler, EditProfileHandler } from './events';
import { ProfilesSagas } from './profiles.sagas';
import { ProfilesService } from './profiles.service';
export const CommandHandlers = [ CreateProfileHandler , EditProfileCommandHandler];
export const EventHandlers = [ ProfileCreatedHandler , EditProfileHandler];

@Module({
  imports: [CqrsModule, ProfilesDataAccessModule],
  providers: [
    ProfilesService,
    ...CommandHandlers,
    ...EventHandlers,
    ProfilesSagas,
  ],
  exports: [ProfilesService],
})
export class ProfilesModule {}
