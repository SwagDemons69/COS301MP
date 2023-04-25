import { post } from "@mp/api/home/util";

export class CreatePost {
    static readonly type = '[Post] CreatePost';
    constructor(public readonly profile: post | null) { }
  }