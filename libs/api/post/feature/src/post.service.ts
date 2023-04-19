import { AddPhotoRequest, AddPhotoResponse, CreatePostLikeCommand, CreatePostLikeRequest, CreatePostLikeResponse, CreatePostRequest, CreatePostResponse } from '@mp/api/post/util';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { AddPhotoCommand, CreatePostCommand } from '@mp/api/post/util';
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
