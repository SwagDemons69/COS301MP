import { ISendMessage } from "../responses/send-message.response";

export class GetMessageCommand {
  constructor(public readonly request: ISendMessage) {}
}
