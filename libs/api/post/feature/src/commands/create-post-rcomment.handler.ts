import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostRootCommentCommand, CreatePostRootCommentResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(CreatePostRootCommentCommand)
export class CreatePostRootCommentCommandHandler
  implements
    ICommandHandler<CreatePostRootCommentCommand, CreatePostRootCommentResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: CreatePostRootCommentCommand) {
    console.log(`${CreatePostRootCommentCommandHandler.name}`);
    const request = command.request;
    console.log("Handler")
    return  await this.repository.createPostRootComment(
        request.user_id, 
        request.post_id, 
        request.comment);
  }
}