import { PostRepository } from '@mp/api/post/data-access';
import { CreatePostEvent } from '@mp/api/post/util';
import { CreatePostEventHandler } from '../../events';

describe('CreatePostEventHandler', () => {
  let handler: CreatePostEventHandler;
  let repository: PostRepository;
  beforeEach(() => {
    repository = {
      createPost: jest.fn(),
    } as any;
    handler = new CreatePostEventHandler(repository);
  });

  describe('handle', () => {
    it('should call repository.createPost with the post from the event', async () => {
      const post = {
		title: "myTestTitle",
        post_id : "1234",
		desc: "I am testing description",
        user_id : "string",
        content : "string",
        likes : 3,
        timeStamp : 12,
        shares : 12,
        kronos : 12,
        comments : 2,
        tags : ["string1", "string2"],
        taggedUsers : ["string1", "string2"]
      };
      const event = new CreatePostEvent(post);
      await handler.handle(event);
      expect(repository.createPost).toHaveBeenCalledWith(post);
    });
  });
});