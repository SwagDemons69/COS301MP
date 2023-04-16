import { PostModule as PostDataAccessModule } from '@mp/api/post/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddPhotoCommandHandler } from './commands';
import { PostService } from './post.service';
export const CommandHandlers = [ AddPhotoCommandHandler];
// export const EventHandlers = [ ProfileCreatedHandler , EditProfileHandler];
// import { ProfileCreatedHandler, EditProfileHandler } from './events';

@Module({
  imports: [CqrsModule, PostDataAccessModule],
  providers: [
    PostService,
     ...CommandHandlers
    // ...EventHandlers
  ],
  exports: [PostService],
})
export class PostModule {}