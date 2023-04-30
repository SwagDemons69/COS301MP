import { AuthService } from '@mp/api/auth/feature';
import { NestFactory } from '@nestjs/core';
import { UserRecord } from 'firebase-admin/auth';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';

//Triggered when user is created
export const onAuthCreate = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    const app = await NestFactory.createApplicationContext(CoreModule);
    const service = app.get(AuthService);
    service.onAuthCreate(user);
  });
