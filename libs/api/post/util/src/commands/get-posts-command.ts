import { GetPostsRequest} from "../requests";
export class GetPostsCommand{
    constructor(public readonly request: GetPostsRequest) {}
}