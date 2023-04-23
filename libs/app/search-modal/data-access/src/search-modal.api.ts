import { Injectable } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { RetrieveProfilesRequest, RetrieveProfilesResponse } from '@mp/api/search-modal/util';

@Injectable()
export class SearchModalApi {
    constructor(private readonly functions: Functions) {}
    
    async retrieveProfiles(request: RetrieveProfilesRequest){
        return await httpsCallable<RetrieveProfilesRequest, RetrieveProfilesResponse>(this.functions, 'RetrieveProfiles')(request);
    }
}