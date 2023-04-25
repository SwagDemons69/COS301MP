import { Test } from '@nestjs/testing';
import { PostService } from './post.service';
import { AddPhotoRequest, CreatePostRequest } from '../../util/src/requests';
import { CommandBus } from '@nestjs/cqrs';
import { AddPhotoResponse, CreatePostResponse } from '../../util/src/responses';
import { AddPhotoCommand, CreatePostCommand } from '../../util/src/commands';
import { post } from '@mp/api/home/util';

describe('Post feature', () => {
    let postFeature: PostService;
    let commandBus: CommandBus;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                PostService,
            {
                provide: CommandBus,
                useValue: {
                    execute: jest.fn(),
                },
            }],
        }).compile();

        postFeature = moduleRef.get<PostService>(PostService);
        commandBus = moduleRef.get<CommandBus>(CommandBus);
    });

    describe('addphoto', () => {
        it('should add a photo by calling commandBus.execute with AddPhotoCommand', async () => {
            const file = './testphoto.jpg';
            const fileName = 'testphoto.jpg';
            const request: AddPhotoRequest = {file, fileName};
            const pathToImage = './testphoto.jpg';
            const response: AddPhotoResponse = {pathToImage};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.AddPhoto(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new AddPhotoCommand(request));
            expect(result).toEqual(response);
        });
    });

    describe('createpost', () => {
        it('should create a post by calling commandBus.execute with CreatePostCommand', async () => {
            const post: post = {
                post_id: '125252',
                user_id: '253243',
                content: 'i\'m not a test post, wdym?',
                caption: 'nothing to see here',
                likes: ['23523','64334'],
                timeStamp: 1624529388,
                shares: 4,
                kronos: 234,
                comments: ['slayy','sureee'],
                categories: ['fashion','future'],
                taggedUsers: ['124145','676346'],
            };
            const request: CreatePostRequest = {post};
            const status = 'successful';
            const response: CreatePostResponse = {status};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.CreatePost(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreatePostCommand(request));
            expect(result).toEqual(response);
        });
    })
    
});