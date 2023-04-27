import { AuthModule } from '@mp/api/auth/feature';
import { EventstoreModule } from '@mp/api/eventstore/feature';
import { ProfilesModule } from '@mp/api/profiles/feature';
import { UsersModule } from '@mp/api/users/feature';
import { SearchModule } from '@mp/api/search/feature';
import { PostModule } from '@mp/api/post/feature'
import { Module } from '@nestjs/common';
import { ChatModule } from '@mp/api/chat/feature'
import { SearchModalModule } from '@mp/api/search-modal/feature';
import { DashboardModule } from '@mp/api/dashboard/feature';

@Module({
  imports: [AuthModule,
     EventstoreModule,
      ProfilesModule,
       UsersModule,
        PostModule,
         ChatModule,
          SearchModalModule,
           SearchModule,
            DashboardModule]
  //imports: [AuthModule, EventstoreModule, ProfilesModule, UsersModule, PostModule, SearchModule]

})
export class CoreModule {}
