import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { PostModule } from '@mp/api/post/feature'
import { SearchModule } from '@mp/api/search/feature';
import { Module } from '@nestjs/common';
import { ChatModule } from '@mp/api/chat/feature'
import { SearchModalModule } from '@mp/api/search-modal/feature';

@Module({
  imports: [AuthModule,
     EventstoreModule,
      ProfilesModule,
       UsersModule, SearchModule,
        PostModule,
         ChatModule,
          SearchModalModule]
})
export class CoreModule {}
