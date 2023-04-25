import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { EditProfileEvent } from '@mp/api/profiles/util';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(EditProfileEvent)
export class EditProfileHandler
  implements IEventHandler<EditProfileEvent>
{
  constructor(private readonly repository: ProfilesRepository) {}

  async handle(event: EditProfileEvent) {
    console.log(`${EditProfileHandler.name}`);
    await this.repository.EditProfile(event.profile);
  }
}