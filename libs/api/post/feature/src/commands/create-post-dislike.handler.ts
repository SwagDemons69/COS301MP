import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostDislikeCommand, CreatePostLikeResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(CreatePostDislikeCommand)
export class CreatePostDislikeCommandHandler
  implements
    ICommandHandler<CreatePostDislikeCommand, CreatePostLikeResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: CreatePostDislikeCommand) {
    console.log("HANDLER");
    console.log(`${CreatePostDislikeCommandHandler.name}`);
    const request = command.request;
    console.log(request)
    // request.commit();

    // const response: CreatePostLikeResponse = { status : "200 OK" };
    // return response;
    return  await this.repository.createPostDislike(request.liker_id, request.post, request.poster_id);
  }
}