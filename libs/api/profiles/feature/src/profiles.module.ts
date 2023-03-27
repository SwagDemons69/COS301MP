import { ProfilesModule as ProfilesDataAccessModule } from '@mp/api/profiles/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateProfileHandler } from './commands';
import { ProfileCreatedHandler } from './events';
import { ProfilesSagas } from './profiles.sagas';
import { ProfilesService } from './profiles.service';
export const CommandHandlers = [ CreateProfileHandler ];
export const EventHandlers = [ ProfileCreatedHandler ];

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
