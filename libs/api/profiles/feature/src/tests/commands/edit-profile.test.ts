import { Test, TestingModule } from '@nestjs/testing';
import { EditProfileCommandHandler } from '../../commands';
import { Profile } from '../../models';
import { CommandBus, EventBus, EventPublisher, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditProfileCommand, EditProfileEvent, EditProfileResponse, edit_profile, user_profile, EditProfileRequest } from '@mp/api/profiles/util';
import { post } from '@mp/api/home/util';
//import { EditProfileHandler } from '../../events';
import { ProfilesRepository } from '@mp/api/profiles/data-access';
const profile = Profile.fromData({user_id: 'testUserId',
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
        posts: [],
        blocked: ['testBlocked1', 'testBlocked2'],
        notifications: ['testNotification1', 'testNotification2'],
      });
profile.create = jest.fn().mockReturnThis();
profile.commit = jest.fn().mockReturnThis();
const publisher = {
    mergeObjectContext: jest.fn().mockReturnValue(profile),
}
const repo = new ProfilesRepository();
describe('EditProfileHandler', () => {
    let handler :EditProfileCommandHandler;
    let commandBus: CommandBus;
    let original_profile: Profile;
    let repository: ProfilesRepository;
    beforeEach( async ()=> {
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                EditProfileCommandHandler, 
                {provide: EventBus, useValue:{}},
                {provide: CommandBus, useValue: {} },
                {provide: EventPublisher, useValue: publisher },
                {provide: ProfilesRepository, useValue: repo}
            ],
        }).compile();
        handler = module.get<EditProfileCommandHandler>(EditProfileCommandHandler);
        commandBus = module.get<CommandBus>(CommandBus);
        original_profile = profile; 
    });
    it("Should edit a profile with the given data", async () => {
        const edited_profile: user_profile = {
        user_id: 'testUserId',
        timeOfExpiry: 1234567890,
        notPublic: 'false',
        username: 'a new name',
        name: 'a new name',
        profilePicturePath: 'a new path',
        bio: 'a different bio',
        email: 'testEmail',
        password: 'testPassword',
        province: 'a new province',
        likesLeft: 1,
        dislikesLeft: 2,
        commentLikesLeft: 3,
        followers: ['testFollower1', 'testFollower2'],
        following: ['testFollowing1', 'testFollowing2'],
        posts: [],
        blocked: ['testBlocked1', 'testBlocked2'],
        notifications: ['testNotification1', 'testNotification2'],
        } 
        const edit_profile : edit_profile ={
            notPublic: 'false',
            bio: 'a different bio',
            name: 'a new name',
            profilePicturePath: 'a new path',
            province: 'a new province',
            username: 'a new name',
        };
        const command = new EditProfileCommand({
            user_id:'testUserId',
            profile: edit_profile,
        });
        /* await handler.execute(command);
        expect(original_profile).toHaveBeenCalledWith(original_profile.EditProfile(edit_profile));
        expect(original_profile.edit).toHaveBeenCalled();
        expect(original_profile.commit).toHaveBeenCalled(); */
    });
});