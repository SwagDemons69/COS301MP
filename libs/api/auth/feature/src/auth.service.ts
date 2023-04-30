import { CreateAuthCommand, ICreateAuthRequest } from '@mp/api/auth/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UserRecord } from 'firebase-admin/auth';

@Injectable()
export class AuthService {
  constructor(private commandBus: CommandBus) {}

  onAuthCreate(user: UserRecord) {
    const request: ICreateAuthRequest = { userRecord: user };
    return this.commandBus.execute(new CreateAuthCommand(request));
  }
}
