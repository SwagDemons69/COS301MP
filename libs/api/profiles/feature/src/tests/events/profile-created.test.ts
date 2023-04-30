import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { ProfileCreatedEvent, user_profile } from '@mp/api/profiles/util';
import { ProfileCreatedHandler } from '../../events';
import { post } from '@mp/api/home/util';
import { Test } from '@nestjs/testing';


describe('ProfileCreatedHandler', () => {
	let handler: ProfileCreatedHandler;
	let repository: ProfilesRepository;
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
	beforeEach(() => {
		repository = new ProfilesRepository();
		handler = new ProfileCreatedHandler(repository);
		repository.createProfile = jest.fn();
	});

	it('should call createProfile with the correct argument', async () => {
		const profile : user_profile = {
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
			followers: 3,
			following: 2,
			posts: 1,
			blocked: 3,
			notifications: ['testNotification1', 'testNotification2'],
		};
		const event = new ProfileCreatedEvent(profile);
		await handler.handle(event);
		expect(repository.createProfile).toHaveBeenCalledWith(profile);
	});
})