import { post } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot implements post{
  constructor(
    public post_id : string,
    public user_id : string,
    public content : string,
    public caption : string,
    public likes : number,
    public timeStamp : number,
    public shares : number,
    public kronos : number,
    public comments : string[],
    public categories : string[],
    public taggedUsers : string[]
  ) {
    super();
  }

  static fromData(post: post): Post {
    const instance = new Post(
      post.post_id,
      post.user_id,
      post.content,
      post.caption,
      post.likes,
      post.timeStamp,
      post.shares,
      post.kronos,
      post.comments,
      post.categories,
      post.taggedUsers
    );
    return instance;
  }

//   create() {
//     this.apply(new ProfileCreatedEvent(this.toJSON()));
//   }

  toJSON(): post {
    return {
        post_id     : this.post_id,
        user_id     : this.user_id,
        content     : this.content,
        caption     : this.caption,
        likes       : this.likes,
        timeStamp   : this.timeStamp,
        shares      : this.shares,
        kronos      : this.kronos,
        comments    : this.comments,
        categories  : this.categories,
        taggedUsers : this.taggedUsers
    };
  }
}