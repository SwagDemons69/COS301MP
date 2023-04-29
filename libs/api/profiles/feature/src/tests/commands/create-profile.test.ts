import { Test, TestingModule } from '@nestjs/testing';
import { CreateProfileHandler } from '../../commands';
import { Profile } from '../../models';
import { CommandBus, EventBus, EventPublisher } from '@nestjs/cqrs';
import { CreateProfileCommand, user_profile } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util';

const mockpost: post = {
  post_id : "1234",
  user_id : "string",
  content : "string",
  caption : "string",
  likes : ["string1", "string2"],
  timeStamp : 12,
  shares : 12,
  kronos : 12,
  comments : ["string1", "string2"],
  categories : ["string1", "string2"],
  taggedUsers : ["string1", "string2"]
};

const mockProfile = Profile.fromData({
  user_id: 'testUserId',
  timeOfExpiry: 1234567890,
  notPublic: 'testNotPublic',
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
  followers: ['testFollower1', 'testFollower2'],
  following: ['testFollowing1', 'testFollowing2'],
  posts: [mockpost],
  blocked: ['testBlocked1', 'testBlocked2'],
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
      timeOfExpiry: 420,
      notPublic: 'false',
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
      followers: [],
      following: [],
      blocked: [],
      posts: [],
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
  
    expect(mockPublisher.mergeObjectContext).toHaveBeenCalledWith(
      Profile.fromData(data),
    );
    expect(mockProfile.create).toHaveBeenCalled();
    expect(mockProfile.commit).toHaveBeenCalled();
  });
})
  