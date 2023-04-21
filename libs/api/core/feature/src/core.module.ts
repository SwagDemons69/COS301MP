import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { PostModule } from '@mp/api/post/feature'
import { Module } from '@nestjs/common';
import { ChatModule } from '@mp/api/chat/feature'

@Module({
  imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule, PostModule, ChatModule]
})
export class CoreModule {}
