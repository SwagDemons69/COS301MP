import { PostModule as PostDataAccessModule } from '@mp/api/post/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AddPhotoCommandHandler, CreatePostChildCommentCommandHandler, CreatePostDislikeCommandHandler, CreatePostRootCommentCommandHandler, GetPostsCommandHandler,  } from './commands';
import { CreatePostCommandHandler } from './commands/create-post.handler';
import { PostService } from './post.service';
import { CreatePostEventHandler } from './events';
import { CreatePostLikeCommandHandler } from './commands/create-post-like.handler';
export const CommandHandlers = [ 
  AddPhotoCommandHandler,
  CreatePostCommandHandler,
  CreatePostLikeCommandHandler,
  CreatePostDislikeCommandHandler,
  CreatePostChildCommentCommandHandler,
  CreatePostRootCommentCommandHandler,
  GetPostsCommandHandler
  ];
export const EventHandlers = [ CreatePostEventHandler ];

@Module({
  imports: [CqrsModule, PostDataAccessModule],
  providers: [
    PostService,
     ...CommandHandlers,
     ...EventHandlers
  ],
  exports: [PostService],
})
export class PostModule {}