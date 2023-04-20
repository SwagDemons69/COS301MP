import { AddPhotoRequest, 
  AddPhotoResponse, 
  CreatePostLikeCommand, 
  CreatePostLikeRequest, 
  CreatePostLikeResponse, 
  CreatePostRequest, 
  CreatePostResponse, 
  CreatePostRootCommentRequest, 
  CreatePostRootCommentResponse,
  CreatePostChildCommentRequest,
  CreatePostChildCommentResponse, 
  GetPostsRequest,
  GetPostsResponse,
  GetPostsCommand} from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddPhotoCommand, 
  CreatePostCommand , 
  CreatePostChildCommentCommand, 
  CreatePostRootCommentCommand } from '@mp/api/post/util';
@Injectable()
export class PostService {
  constructor(private readonly commandBus: CommandBus) {}

    async AddPhoto(request: AddPhotoRequest): Promise<AddPhotoResponse> {
        return await this.commandBus.execute<AddPhotoCommand, AddPhotoResponse>(new AddPhotoCommand(request));
    }
 
    async CreatePost(request: CreatePostRequest): Promise<CreatePostResponse> {
        return await this.commandBus.execute<CreatePostCommand, CreatePostResponse>(new CreatePostCommand(request));
    }

    async CreatePostLike(request: CreatePostLikeRequest): Promise<CreatePostLikeResponse> {
        return await this.commandBus.execute<CreatePostLikeCommand, CreatePostLikeResponse>(new CreatePostLikeCommand(request));
    }

    async CreateRootComment(request: CreatePostRootCommentRequest): Promise<CreatePostRootCommentResponse> {
        return await this.commandBus.execute<CreatePostRootCommentCommand, CreatePostRootCommentResponse>(new CreatePostRootCommentCommand(request));
    }

    async CreateChildComment(request: CreatePostChildCommentRequest): Promise<CreatePostChildCommentResponse> {
        return await this.commandBus.execute<CreatePostChildCommentCommand, CreatePostChildCommentResponse>(new CreatePostChildCommentCommand(request));
    }

    async GetPosts(request: GetPostsRequest): Promise<GetPostsResponse> {
        return await this.commandBus.execute<GetPostsCommand, GetPostsResponse>(new GetPostsCommand(request)); 
    }

    
  //=======================================================
  // EXAMPLE CODE FROM DEMO REPO
  //=======================================================

//   async updateAccountDetails(
//     request: IUpdateAccountDetailsRequest
//   ): Promise<IUpdateAccountDetailsResponse> {
//     return await this.commandBus.execute<
//       UpdateAccountDetailsCommand,
//       IUpdateAccountDetailsResponse
//     >(new UpdateAccountDetailsCommand(request));
//   }

//   async updateAddressDetails(
//     request: IUpdateAddressDetailsRequest
//   ): Promise<IUpdateAddressDetailsResponse> {
//     return await this.commandBus.execute<
//       UpdateAddressDetailsCommand,
//       IUpdateAddressDetailsResponse
//     >(new UpdateAddressDetailsCommand(request));
//   }

//   async updateContactDetails(
//     request: IUpdateContactDetailsRequest
//   ): Promise<IUpdateContactDetailsResponse> {
//     return await this.commandBus.execute<
//       UpdateContactDetailsCommand,
//       IUpdateContactDetailsResponse
//     >(new UpdateContactDetailsCommand(request));
//   }

//   async updatePersonalDetails(
//     request: IUpdatePersonalDetailsRequest
//   ): Promise<IUpdatePersonalDetailsResponse> {
//     return await this.commandBus.execute<
//       UpdatePersonalDetailsCommand,
//       IUpdatePersonalDetailsResponse
//     >(new UpdatePersonalDetailsCommand(request));
//   }

//   async updateOccupationDetails(
//     request: IUpdateOccupationDetailsRequest
//   ): Promise<IUpdateOccupationDetailsResponse> {
//     return await this.commandBus.execute<
//       UpdateOccupationDetailsCommand,
//       IUpdateOccupationDetailsResponse
//     >(new UpdateOccupationDetailsCommand(request));
//   }
}
