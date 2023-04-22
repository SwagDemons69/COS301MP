import { Injectable } from '@angular/core';
import {
  edit_profile,
  user_profile,
  EditProfileRequest,
  EditProfileResponse
} from '@mp/api/profiles/util';
import { AuthState } from '@mp/app/auth/data-access';
import { Logout as AuthLogout } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import {
    SetHeaders,
  SubscribeToMessageHeaders
} from '@mp/app/messages/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { MessagesApi } from './messages.api';
import produce from 'immer';
import { post } from '@mp/api/home/util';
import { doc } from '@firebase/firestore';
import { user } from 'firebase-functions/v1/auth';
import { ChatHeader, ChatHeaders } from '@mp/api/chat/util';


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MessagesStateModel {
        headers: ChatHeader[]
}

@State<MessagesStateModel>({
  name : 'messages',
  defaults: {
    headers : []
  }
})


@Injectable()
export class MessagesState {
  //follower : number;
  constructor(
    private readonly messagesApi: MessagesApi,
    private readonly store: Store,
  ) { }



  @Selector()
  static headers(state: MessagesStateModel) {
    return state.headers;
  }

  @Action(SubscribeToMessageHeaders)
  async SubscribeToMessageHeaders(ctx: StateContext<MessagesStateModel>){
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    const headers = await this.messagesApi.headers$(user.uid);
    
    return this.store.dispatch(new SetHeaders(headers));
  }

  @Action(SetHeaders)
  SetHeaders(ctx: StateContext<MessagesStateModel>, { headers }: SetHeaders) {
    return ctx.setState(
        produce((draft) =>{
            draft.headers = headers;
        })
    )
  }

}
