import { ReplyFollowRequest } from '../requests';

export class ReplyFollowRequestEvent {
    constructor(public readonly request: ReplyFollowRequest) {}
}