import { PostService } from '@mp/api/post/feature';
import { AddPhotoRequest, AddPhotoResponse, CreatePostChildCommentRequest, CreatePostChildCommentResponse, CreatePostLikeRequest, CreatePostLikeResponse, CreatePostRequest, CreatePostResponse, CreatePostRootCommentRequest, CreatePostRootCommentResponse } from '@mp/api/post/util';
import { NestFactory } from '@nestjs/core';
import * as functions from 'firebase-functions';
import { CoreModule } from '../core.module';


export const AddPhotoToCloudStorage = functions.https.onCall(
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

  export const CreatePostLike = functions.https.onCall(
    async (request : CreatePostLikeRequest): Promise<CreatePostLikeResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(PostService);
      return service.CreatePostLike(request);
    }
  );

  export const CreateRootComment = functions.https.onCall(
    async (request : CreatePostRootCommentRequest): Promise<CreatePostRootCommentResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(PostService);
      return service.CreateRootComment(request);
    }
  );

  export const CreateChildComment = functions.https.onCall(
    async (request : CreatePostChildCommentRequest): Promise<CreatePostChildCommentResponse> => {
      const app = await NestFactory.createApplicationContext(CoreModule);
      const service = app.get(PostService);
      return service.CreateChildComment(request);
    }
  );

  