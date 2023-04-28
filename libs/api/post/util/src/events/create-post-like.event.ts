
export class CreatePostLikeEvent {
  constructor(public readonly liker_id: string, public readonly post_id : string, public readonly poster_id : string) {}
}
