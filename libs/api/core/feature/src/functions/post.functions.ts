import { PostService } from '@mp/api/post/feature';
import { AddPhotoRequest, AddPhotoResponse, CreatePostRequest, CreatePostResponse } from '@mp/api/post/util';
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

export const AddPostToFirestore = functions.https.onCall(
    async (request : CreatePostRequest): Promise<CreatePostResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(PostService);
      return service.CreatePost(request);
    }
  );