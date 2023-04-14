import { IGetAllChats } from "../responses/get-all-chats.response";

export class GetAllChatsCommand {
  constructor(public readonly request: IGetAllChats) {}
}
