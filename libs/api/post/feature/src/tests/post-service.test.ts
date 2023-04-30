import { Test } from '@nestjs/testing';
import { PostService } from '../post.service';
import { CommandBus } from '@nestjs/cqrs';
import { post } from '@mp/api/home/util';
import { AddPhotoRequest, CreatePostLikeRequest, CreatePostRequest, CreatePostRootCommentRequest, CreatePostChildCommentRequest, GetPostsRequest } from 'libs/api/post/util/src/requests';
import { AddPhotoResponse, CreatePostChildCommentResponse, CreatePostLikeResponse, CreatePostResponse, CreatePostRootCommentResponse, GetPostsResponse } from 'libs/api/post/util/src/responses';
import { AddPhotoCommand, CreatePostChildCommentCommand, CreatePostCommand, CreatePostLikeCommand, CreatePostRootCommentCommand, GetPostsCommand } from 'libs/api/post/util/src/commands';
import { ChildComment, RootComment, post_like } from 'libs/api/post/util/src/interfaces';
import { user_profile } from '@mp/api/profiles/util';

const mockpost: post = {
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

const mockuser: user_profile = {
    user_id: '77472',
    timeOfExpiry: 214124,
    notPublic: 'false',
    profilePicturePath: './testphoto.jpg',
    email: 'test@gmail.com',
    password: 'iamkwl',
    username: 'testUsername',
    name: undefined,
    bio: undefined,
    province: undefined,
    likesLeft: undefined,
    dislikesLeft: undefined,
    commentLikesLeft: undefined,
    followers: 3,
    following: 4,
    posts: 5,
    blocked: 6,
    notifications: undefined
};

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
            const post: post = mockpost;
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
            const liker_id = '823758';
            const post = '2579253';
			const poster_id = '12312';
            const request: CreatePostLikeRequest = {liker_id, post,poster_id};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(request);

            const result = await postFeature.CreatePostLike(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreatePostLikeCommand(request));
            expect(result).toEqual(request);
        });
    });

    describe('createrootcomment', () => {
        it('should add a root comment to a post - call commandbus.execute with CreatePostRootCommentCommand', async () => {
            const post_id = mockpost.post_id;
            const user_id = mockuser.user_id;
            const comment: RootComment = {
                root_comment_id: '1244',
                created_by: '253243',
				created_by_username: 'testUsername',
                content: 'haha rofl',
                kronos: 24,
                likes: 2,
                comments: []
            }
            const request: CreatePostRootCommentRequest = {post_id, user_id, comment};
            const post_comments: RootComment[] = [
                comment
            ];
            const response: CreatePostRootCommentResponse = {post_comments};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.CreateRootComment(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreatePostRootCommentCommand(request));
            expect(result).toEqual(response);

        })
    })

    describe('createchildcomment', () => {
        it('should add a child comment to a root comment - call commandbus.execute with CreatePostChildCommentCommand', async () => {
            const user_id = mockpost.user_id;
            const post_id = mockpost.post_id;
            const root_comment: RootComment = {
                root_comment_id: '1244',
                created_by: '253243',
				created_by_username: 'testUsername',
                content: 'haha rofl',
                kronos: 24,
                likes: 2,
                comments: []
            }
            const root_comment_id = root_comment.root_comment_id;
            const comment: ChildComment = {
                child_comment_id: '15152',
                created_by: '42532',
				created_by_username: 'anotherTestUsername',
                content: 'what an angel!',
                kronos: 0,
                likes: 0
            }
            const request: CreatePostChildCommentRequest = {user_id, post_id, root_comment_id, comment};
            const response_comment: RootComment = {
                root_comment_id: '1244',
                created_by: '253243',
				created_by_username : 'testUsernameAgain',
                content: 'haha rofl',
                kronos: 24,
                likes: 2,
                comments: [comment]
            }
            const post_comments: RootComment[] = [
                 response_comment
                ]
            const response: CreatePostChildCommentResponse= {post_comments};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.CreateChildComment(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new CreatePostChildCommentCommand(request));
            expect(result).toEqual(response);
        });
    });

    describe('getposts', () => {
        it('should get all posts from a user - call commandbus.execute with GetPostsCommand', async () => {
            const user = mockuser.user_id;
            const request: GetPostsRequest = {user};
            const posts = [mockpost];
            const response: GetPostsResponse = {posts};
            jest.spyOn(commandBus, 'execute').mockResolvedValue(response);

            const result = await postFeature.GetPosts(request);

            expect(commandBus.execute).toHaveBeenCalledWith(new GetPostsCommand(request));
            expect(result).toEqual(response);
        });
    });

});