import { SearchRepository } from '@mp/api/search/data-access';
import { SearchEventHandler } from '../../events';
import { post } from '@mp/api/home/util';
import { user_profile } from '@mp/api/profiles/util'


describe('SearchEventHandler', () => {
	let repo: SearchRepository;
	let handler: SearchEventHandler;
	const mock_post : post = {
		title: "testTitle",
		post_id : "12345",
        user_id : "testID",
        content : "testContent",
        desc : "testCaption",
        likes : 4,
        timeStamp : 123,
        shares : 123,
        kronos : 123,
		comments: 2,
        tags : ["Testing", "AlsoTesting"],
        taggedUsers : ["fakeUser1", "fakeUser2"]
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