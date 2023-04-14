import { IGetChatHistory} from "../responses/get-chat-history.response";

export class GetChatHistoryCommand {
  constructor(public readonly request: IGetChatHistory) {}
}
