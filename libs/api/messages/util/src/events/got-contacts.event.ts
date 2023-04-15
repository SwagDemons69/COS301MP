import { IMessages } from "../interfaces";

export class GotContactsEvent {
    constructor(public readonly messages: IMessages) {}
}