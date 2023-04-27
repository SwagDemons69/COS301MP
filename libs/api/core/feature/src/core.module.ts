import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { Module } from '@nestjs/common';
import { NotificationModule } from '@mp/api/notifications/feature';

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule, NotificationModule],
})
export class CoreModule {}
