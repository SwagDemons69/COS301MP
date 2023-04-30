import { AggregateRoot } from '@nestjs/cqrs'; 
import { post } from '@mp/api/home/util'
import { CreatePostEvent } from '@mp/api/post/util';

export class Post extends AggregateRoot implements post {
  constructor(
    public post_id : string,
    public user_id : string,
    public title   : string,
    public content : string,
    public desc : string,
    public likes : number,
    public timeStamp : number,
    public shares : number,
    public kronos : number,
    public comments : number,
    public tags : string[],
    public taggedUsers : string[]
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
      post.timeStamp,
      post.shares,
      post.kronos,
      post.comments,
      post.tags,
      post.taggedUsers
    );
    return instance;
  }

  static defaultPost(): Post{
    const instance = new Post(
        "",
        "",
        "",
        "",
        "",
        0,
        0,
        0,
        0,
        0,
        [],
        []
    )
    return instance;
  }

  sendPost(){
    this.apply(new CreatePostEvent(this.toJSON()));
  }

  managePost(post : post) {
    this.post_id     =  (this.post_id == post.post_id)         ?   this.post_id     :  post.post_id;
    this.user_id     =  (this.user_id == post.user_id)         ?   this.user_id     :  post.user_id;
    this.title       =  (this.title == post.title)             ?   this.title       :  post.title;
    this.content     =  (this.content == post.content)         ?   this.content     :  post.content;
    this.desc        =  (this.desc == post.desc)               ?   this.desc        :  post.desc;
    this.likes       =  (this.likes == post.likes)             ?   this.likes       :  post.likes;
    this.timeStamp   =  (this.timeStamp == post.timeStamp)     ?   this.timeStamp   :  post.timeStamp;
    this.shares      =  (this.shares == post.shares)           ?   this.shares      :  post.shares;
    this.kronos      =  (this.kronos == post.kronos)           ?   this.kronos      :  post.kronos;
    this.comments    =  (this.comments == post.comments)       ?   this.comments    :  post.comments;
    this.tags        =  (this.tags == post.tags)               ?   this.tags        :  post.tags;
    this.taggedUsers =  (this.taggedUsers == post.taggedUsers) ?   this.taggedUsers :  post.taggedUsers;
  }

  toJSON(): post {
    return {
        post_id     : this.post_id,
        user_id     : this.user_id,
        title       : this.title,
        content     : this.content,
        desc        : this.desc,
        likes       : this.likes,
        timeStamp   : this.timeStamp,
        shares      : this.shares,
        kronos      : this.kronos,
        comments    : this.comments,
        tags        : this.tags,
        taggedUsers : this.taggedUsers
    };
  }
}