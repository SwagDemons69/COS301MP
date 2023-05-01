import { Test, TestingModule } from '@nestjs/testing';
import { CreateProfileHandler } from '../../commands';
import { Profile } from '../../models';
import { CommandBus, EventBus, EventPublisher } from '@nestjs/cqrs';
import { CreateProfileCommand, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util';

const mockpost: post = {
	post_id: "1234",
	title: "testingTitle",
	desc: "I am testing description",
	user_id: "string",
	content: "string",
	likes: 3,
	timeStamp: 12,
	shares: 12,
	kronos: 12,
	comments: 2,
	tags: ["string1", "string2"],
	taggedUsers: ["string1", "string2"]
};

const mockProfile = Profile.fromData({
  user_id: 'testUserId',
  timeOfExpiry: 1234567890,
  notPublic: false,
  username: 'testUsername',
  name: 'testName',
  profilePicturePath: 'testProfilePicturePath',
  bio: 'testBio',
  email: 'testEmail',
  password: 'testPassword',
  province: 'testProvince',
  likesLeft: 1,
  dislikesLeft: 2,
  commentLikesLeft: 3,
  followers: 5,
  following: 2,
  posts: 3,
  blocked: 1,
  notifications: ['testNotification1', 'testNotification2'],
});

mockProfile.create = jest.fn().mockReturnThis();
mockProfile.commit = jest.fn().mockReturnThis();

const mockPublisher = {
  mergeObjectContext: jest.fn().mockReturnValue(mockProfile),
};

describe('CreateProfileHandler', () => {
  let handler: CreateProfileHandler;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProfileHandler,
        { provide: EventBus, useValue: {} },
        { provide: CommandBus, useValue: {} },
        { provide: EventPublisher, useValue: mockPublisher },
      ],
    }).compile();

    handler = module.get<CreateProfileHandler>(CreateProfileHandler);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should create a profile with the given data', async () => {
    const data: user_profile = {
      user_id: '123',
      timeOfExpiry: 0,
      notPublic: false,
      username: 'testuser',
      name: 'testuser',
      profilePicturePath: 'https://ionicframework.com/docs/img/demos/avatar.svg',
      bio: '',
      email: 'testuser@example.com',
      password: '',
      province: '',
      likesLeft: 10,
      dislikesLeft: 10,
      commentLikesLeft: 10,
      followers: 0,
      following: 0,
      blocked: 0,
      posts: 0,
      notifications: [],
    };
  
    const mockProfile2 = Profile.fromData(data);
    mockProfile2.create = jest.fn().mockReturnThis();
    mockProfile2.commit = jest.fn().mockReturnThis();  
    const command = new CreateProfileCommand({
      user: {
        id: '123',
        displayName: 'testuser',
        email: 'testuser@example.com',
        photoURL: '',
        phoneNumber: '',
      },
    });
  
    await handler.execute(command);
  
    expect(mockProfile.create).toHaveBeenCalled();
    expect(mockProfile.commit).toHaveBeenCalled();
  });
})