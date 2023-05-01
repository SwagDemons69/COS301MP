import { post } from '@mp/api/home/util';
import { AggregateRoot } from '@nestjs/cqrs';

export class Post extends AggregateRoot implements post {
  constructor(
    public post_id: string,
    public user_id: string,
    public title: string,
    public content: string,
    public desc: string,
    public likes: number,
    public dislikes: number,
    public timeStamp: number,
    public shares: number,
    public kronos: number,
    public comments: number,
    public tags: string[],
    public taggedUsers: string[]
  ) {
    super();
  }

  static fromData(post: post): Post {
    const instance = new Post(
      post.post_id,
      post.user_id,
      post.title,
      post.content,
      post.desc,
      post.likes,
      post.dislikes,
      post.timeStamp,
      post.shares,
      post.kronos,
      post.comments,
      post.tags,
      post.taggedUsers
    );
    return instance;
  }

  //   create() {
  //     this.apply(new ProfileCreatedEvent(this.toJSON()));
  //   }

  toJSON(): post {
    return {
      post_id: this.post_id,
      user_id: this.user_id,
      title: this.title,
      content: this.content,
      desc: this.desc,
      likes: this.likes,
      dislikes: this.dislikes,
      timeStamp: this.timeStamp,
      shares: this.shares,
      kronos: this.kronos,
      comments: this.comments,
      tags: this.tags,
      taggedUsers: this.taggedUsers
    };
  }
}