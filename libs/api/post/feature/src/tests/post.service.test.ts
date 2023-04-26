import { Test } from '@nestjs/testing';
import { PostService } from '../post.service';
import { CommandBus } from '@nestjs/cqrs';
import { post } from '@mp/api/home/util';
import { AddPhotoRequest, CreatePostLikeRequest, CreatePostRequest } from 'libs/api/post/util/src/requests';
import { AddPhotoResponse, CreatePostLikeResponse, CreatePostResponse } from 'libs/api/post/util/src/responses';
import { AddPhotoCommand, CreatePostCommand, CreatePostLikeCommand } from 'libs/api/post/util/src/commands';
import { post_like } from 'libs/api/post/util/src/interfaces';


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
    });

    describe('createpostlike', () => {
        it('should add a like by calling commandbus.execute with CreatePostLikeCommand', async () => {
            const user = '823758';
            const post = '2579253';
            const request: CreatePostLikeRequest = {user, post};
            const likes: post_like[] = [
                { user: '234234'},
                { user: '646464'}
            ]
            const response: CreatePostLikeResponse = {likes};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.CreatePostLike(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreatePostLikeCommand(request));
            expect(result).toEqual(response);
        });
    });

    
    
});