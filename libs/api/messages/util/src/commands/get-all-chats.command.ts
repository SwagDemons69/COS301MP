import { IGetAllChatsRequest } from "../requests";

export class GetAllChatsCommand {
  constructor(public readonly request: IGetAllChatsRequest) {}
}
