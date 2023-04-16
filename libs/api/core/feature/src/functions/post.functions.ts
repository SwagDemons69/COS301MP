import { PostService } from '@mp/api/post/feature';
import { AddPhotoRequest, AddPhotoResponse } from '@mp/api/post/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';


export const AddPostToCloudStorage = functions.https.onCall(
    async (request : AddPhotoRequest): Promise<AddPhotoResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(PostService);
      return service.AddPhoto(request);
    }
  );