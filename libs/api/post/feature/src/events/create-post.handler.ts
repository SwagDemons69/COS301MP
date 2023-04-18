import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostEvent } from '@mp/api/post/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreatePostEvent)
export class CreatePostEventHandler
  implements IEventHandler<CreatePostEvent>
{
  constructor(private readonly repository: PostRepository) {}

  async handle(event: CreatePostEvent) {
    console.log(`${CreatePostEventHandler.name}`);
    await this.repository.createPost(event.post);
  }
}
