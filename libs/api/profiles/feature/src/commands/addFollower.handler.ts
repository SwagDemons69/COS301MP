import { ProfilesRepository } from '@mp/api/profiles/data-access';
import { addFollowerCommand, addFollowerResponse } from '@mp/api/profiles/util';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(addFollowerCommand)
export class addFollowerCommandHandler implements
    ICommandHandler<addFollowerCommand, addFollowerResponse>
{
    constructor( private readonly repository: ProfilesRepository ) {}

    async execute(command : addFollowerCommand){
        const request = command.request;
        return await this.repository.addFollower(request);
    }
}