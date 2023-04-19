import { DisplayProfileRequest, DisplayProfileResponse } from '@mp/api/profiles/util';
import { Injectable } from '@nestjs/common';
import { IQueryBus } from '@nestjs/cqrs';

@Injectable()
export class ProfilePageServices {

constructor(private readonly queryBus: IQueryBus) {}

//   async displayProfile(request : DisplayProfileRequest) : Promise<DisplayProfileResponse> {
//     //return this.queryBus.execute()
//   }

}
  