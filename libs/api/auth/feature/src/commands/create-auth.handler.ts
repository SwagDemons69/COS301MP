import { CreateAuthCommand, IAuth } from '@mp/api/auth/util';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Timestamp } from 'firebase-admin/firestore';
import { Auth } from '../models';

@CommandHandler(CreateAuthCommand)
export class CreateAuthHandler implements ICommandHandler<CreateAuthCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateAuthCommand) {
    console.log(`${CreateAuthHandler.name}`);
    console.log("INSIDE CREATE AUTH HANDLER")

    const request = command.request;
    console.log("#############################")
    console.log(request.userRecord.displayName);
    const data: IAuth = {
      id: request.userRecord.uid,
      email: request.userRecord.email,
      displayName: request.userRecord.displayName,
      photoURL: request.userRecord.photoURL,
      phoneNumber: request.userRecord.phoneNumber,
      customClaims: request.userRecord.customClaims,
      created: Timestamp.fromDate(new Date()),
    };
    const auth = this.publisher.mergeObjectContext(Auth.fromData(data));

    auth.create();
    auth.commit();
  }
}
