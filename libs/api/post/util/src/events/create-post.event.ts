import { post } from '@mp/api/home/util';

export class CreatePostEvent {
  constructor(public readonly post: post) {}
}
