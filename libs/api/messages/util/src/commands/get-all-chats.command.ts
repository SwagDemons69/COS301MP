import { GetAllChatsRequest } from "../requests";

export class GetAllChatsCommand {
  constructor(public readonly request: GetAllChatsRequest) {}
}
