import { CreateChatRequest } from "../requests";

export class CreateChatCommand {
    constructor(public readonly request: CreateChatRequest) {}
}