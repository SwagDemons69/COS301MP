import { Component } from '@angular/core';
import { user_profile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { MessagesState } from '@mp/app/messages/data-access';
import { SubscribeToProfile, SubscribeToProfilePosts } from '@mp/app/profile/util';
import { SubscribeToMessageHeaders } from '@mp/app/messages/util';
//import { SubscribeToProfile } from '@mp/app/profile/util'
import { Select, Store } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { post } from '@mp/api/home/util';
import { ChatHeader } from '@mp/api/chat/util';

@Component({
  selector: 'ms-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(MessagesState.headers) headers$!: Observable<ChatHeader[] | []>;
  constructor(private readonly store: Store) { }

  ionViewWillEnter() {
    this.store.dispatch(new SubscribeToProfile());
    this.store.dispatch(new SubscribeToMessageHeaders());
  }
}
