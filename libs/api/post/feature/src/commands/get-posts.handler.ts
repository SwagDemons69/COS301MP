import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostRootCommentCommand, CreatePostRootCommentResponse, GetPostsCommand, GetPostsResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(GetPostsCommand)
export class GetPostsCommandHandler
  implements
    ICommandHandler<GetPostsCommand, GetPostsResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: GetPostsCommand) {
    console.log(`${GetPostsCommandHandler.name}`);
    const request = command.request;
    return await this.repository.getPosts(request.user);
  }
}