import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostChildCommentCommand, CreatePostChildCommentResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(CreatePostChildCommentCommand)
export class CreatePostChildCommentCommandHandler
  implements
    ICommandHandler<CreatePostChildCommentCommand, CreatePostChildCommentResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: CreatePostChildCommentCommand) {
    console.log(`${CreatePostChildCommentCommandHandler.name}`);
    const request = command.request;
    console.log("Handler")
    return  await this.repository.createPostChildComment(
        request.user_id,
         request.post_id,
         request.root_comment_id,
         request.comment.content,
         request.comment.kronos,
         request.comment.likes);
  }
}