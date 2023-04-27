import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostLikeEvent } from '@mp/api/post/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CreatePostLikeEvent)
export class CreatePostLikeEventHandler
  implements IEventHandler<CreatePostLikeEvent>
{
  constructor(private readonly repository: PostRepository) {}

  async handle(event: CreatePostLikeEvent) {
    console.log(`${CreatePostLikeEventHandler.name}`);
    await this.repository.createPostLike(event.liker_id, event.post_id, event.poster_id);
  }
}
