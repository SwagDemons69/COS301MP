import { SearchRepository } from '@mp/api/search/data-access';
import { SearchEvent } from '@mp/api/search/util';
import { SearchEventHandler } from '../../events';
import { SearchRequest } from '@mp/api/search/util';
import { SearchQuery } from '@mp/api/search/util';
import { post } from '@mp/api/home/util';
import { user_profile } from '@mp/api/profiles/util'


describe('SearchEventHandler', () => {
	let repo: SearchRepository;
	let handler: SearchEventHandler;
	const mock_post : post = {
		post_id : "12345",
        user_id : "testID",
        content : "testContent",
        caption : "testCaption",
        likes : ["fakeUser1", "fakeUser2"],
        timeStamp : 123,
        shares : 123,
        kronos : 123,
        comments : ["testComment1", "testComment2"],
        categories : ["Testing", "AlsoTesting"],
        taggedUsers : ["fakeUser1", "fakeUser2"]
	};
	const mock_user_profile: user_profile = {
		user_id: '123456789',
		timeOfExpiry: 1234567890,
		notPublic: 'test',
		username: 'testUser',
		name: 'myName',
		profilePicturePath: '/my/photo',
		bio: 'this is a bio',
		email: 'test@user',
		password: 'myTestPassword',
		province: 'TestingProvince',
		likesLeft: 123,
		dislikesLeft: 123,
		commentLikesLeft: 123,
		followers: ['fakeUser1', 'fakeUser2'],
		following: ['fakeUser1', 'fakeUser2'],
		posts: [],
		blocked: ['fakeBlocked1', 'fakeBlocked2'],
		notifications: ['testNotification1', 'testNotification2'],
	};
	beforeEach(() => {
		repo = new SearchRepository();
		handler = new SearchEventHandler(repo);
		repo.search = jest.fn();
	});

	it('Use the search feature to find correct profile', async () => {
		//const event = new SearchEvent();
	})
})