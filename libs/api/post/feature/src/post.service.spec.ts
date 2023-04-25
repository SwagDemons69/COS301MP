import { Test } from '@nestjs/testing';
import { PostService } from './post.service';
import { AddPhotoRequest } from '../../util/src/requests';
import { CommandBus } from '@nestjs/cqrs';
import { AddPhotoResponse } from '../../util/src/responses';
import { AddPhotoCommand } from '../../util/src/commands';

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

    
});