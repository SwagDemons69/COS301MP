import { PostRepository } from '@mp/api/post/data-access';
import { AddPhotoCommand, AddPhotoResponse } from '@mp/api/post/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
//import { Profile } from '../models';

@CommandHandler(AddPhotoCommand)
export class AddPhotoCommandHandler
  implements
    ICommandHandler<AddPhotoCommand, AddPhotoResponse>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: PostRepository
  ) {}

  async execute(command: AddPhotoCommand) {
    console.log(`${AddPhotoCommandHandler.name}`);
 
    const request = command.request;
    return  await this.repository.AddPhoto(request.file, request.fileName);
  }
}