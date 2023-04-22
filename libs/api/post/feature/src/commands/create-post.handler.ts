import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostCommand, CreatePostResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Post } from '../models';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements
    ICommandHandler<CreatePostCommand, CreatePostResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: CreatePostCommand) {
    console.log(`${CreatePostCommandHandler.name}`);

    const request = command.request;
    const newPost = request.post;
    const post = this.publisher.mergeObjectContext( Post.defaultPost() );
    post.managePost(newPost);
    post.sendPost();
    post.commit();

    const response: CreatePostResponse = { status : "200 OK" };
    return response;
    
  }
}