import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { AddPhotoRequest } from '../../util/src/requests';

describe('Post feature', () => {
    let postFeature: PostService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [PostService],
        }).compile();

        postFeature = moduleRef.get<PostService>(PostService);
    });

    it('should add a photo', async () => {
        const addphotorequest = new AddPhotoRequest
    })
});