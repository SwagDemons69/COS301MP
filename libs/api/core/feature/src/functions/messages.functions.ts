import { IUpdateOccupationDetailsRequest, IUpdateOccupationDetailsResponse } from "@mp/api/profiles/util";
import { NestFactory } from "@nestjs/core";
import { CoreModule } from "../core.module";
import * as functions from 'firebase-functions';
import { ProfilesService } from "@mp/api/profiles/feature";

export const getContacts = functions.https.onCall(
    async (request: IUpdateOccupationDetailsRequest):   Promise<IUpdateOccupationDetailsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(ProfilesService);
        return service.updateOccupationDetails(request);
    }
);

export const getChatHistory = functions.https.onCall(
    async (request: IUpdateOccupationDetailsRequest):   Promise<IUpdateOccupationDetailsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(ProfilesService);
        return service.updateOccupationDetails(request);
    }
);

export const sendMessage = functions.https.onCall(
    async (request: IUpdateOccupationDetailsRequest):   Promise<IUpdateOccupationDetailsResponse> => {
        const app = await NestFactory.createApplicationContext(CoreModule);
        const service = app.get(ProfilesService);
        return service.updateOccupationDetails(request);
    }
);