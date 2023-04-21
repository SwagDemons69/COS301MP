import { CreatePostRequest } from '../requests';

export class CreatePostCommand {
  constructor(public readonly request: CreatePostRequest) {}
}