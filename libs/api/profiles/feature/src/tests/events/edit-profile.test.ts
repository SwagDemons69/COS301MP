import { EditProfileHandler } from "../../events";
import { EditProfileEvent } from "@mp/api/profiles/util";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ProfilesRepository } from "@mp/api/profiles/data-access";
import { user_profile } from "@mp/api/profiles/util";

//this is kind of an integration test, as we access firestore via the ProfilesRepository
describe('EditProfileHandler', () =>{
    let handler :EditProfileHandler;
    let repository: ProfilesRepository;
    const mock_user_profile : user_profile = {
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
      followers: 2,
      following: 3,
      posts: 1,
      blocked: 0,
      notifications: ['testNotification1', 'testNotification2'],
    };
    const mockEdit: EditProfileEvent = {
        profile :mock_user_profile
    };
    beforeEach(() => {
        repository  = new ProfilesRepository();
        handler = new EditProfileHandler(repository);
        repository.EditProfile = jest.fn();
    });
    it('should handle the EditProfileEvent', async () => {
        await handler.handle(mockEdit);
        expect(repository.EditProfile).toHaveBeenCalledWith(mock_user_profile);
    });
})