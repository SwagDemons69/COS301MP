import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostLikeCommand, CreatePostLikeResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(CreatePostLikeCommand)
export class CreatePostLikeCommandHandler
  implements
    ICommandHandler<CreatePostLikeCommand, CreatePostLikeResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: CreatePostLikeCommand) {
    console.log(`${CreatePostLikeCommandHandler.name}`);
    const request = command.request;
    console.log("Handler")
    return  await this.repository.createPostLike(request.user, request.post);
  }
}