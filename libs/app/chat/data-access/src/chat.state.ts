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
  Logout,
  SetProfile,
  SubscribeToProfile,
  SubscribeToProfilePosts,
  SetPosts,
  EditProfile,
  InitForm,
  GetImages
} from '@mp/app/profile/util';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs';
import { ChatApi } from './chat.api';
import produce from 'immer';
import { post } from '@mp/api/home/util';
import { doc } from '@firebase/firestore';
import { user } from 'firebase-functions/v1/auth';
import { ChatMessage, ChatMessages } from '@mp/api/chat/util';
import { SubscribeToChat, SetChatMessages, SetRecipient, SetUsername } from '@mp/app/chat/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatStateModel {
  recipient: {
    user_id : string;
    username : string;
    pictureUrl: string;
  },
  chats : ChatMessage[]
}
// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface RecipientState {
//   username: string;
//   pictureUrl: string;
//   chats : ChatMessage[]
//   recipient: string;
// }

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    recipient: {
      user_id : "",
      username: "",
      pictureUrl: "",
    },
    chats: [],
  }
})




@Injectable()
export class ChatState {
  //follower : number;
  constructor(
    private readonly chatApi: ChatApi,
    private readonly store: Store,
  ) { }

  @Selector()
  static chats(state : ChatStateModel){
    return state.chats;
  }

  @Selector()
  static recipient(state : ChatStateModel){
    return state.recipient;
  }

  @Action(SubscribeToChat)
  SubscribeToChat(ctx: StateContext<ChatStateModel>){
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    return this.chatApi
       .chats$(user.uid)
       .pipe(tap((profile: user_profile) => ctx.dispatch(new SetChatMessages(user.uid, ctx.getState().recipient.user_id))));
  }

  @Action(SetChatMessages)
  async SetChatMessages(ctx: StateContext<ChatStateModel>, { sender, receiver }: SetChatMessages){
     console.log("IT SHOULD BE CHANGING WTF")
     //const headers = await this.messagesApi.headers(user);
     console.log(sender + " " + receiver);
     //"k1BcHMYPHPBOa3Kokj7KYwke9VBF"
     const chats = await this.chatApi.getChatMessages({ sender: sender, reciever: receiver });
     console.log(chats.data.messages);
     return ctx.setState(
         produce((draft) =>{
             draft.chats = chats.data.messages;
         })
     );
  }

  @Action(SetRecipient)
  SetRecipient(ctx: StateContext<ChatStateModel>, { user }: SetRecipient){
  return ctx.setState(
    produce((draft) => {
      draft.recipient = user;
    })
  );
  }

  @Action(SetUsername)
  SetUsername(ctx: StateContext<ChatStateModel>, { username }: SetUsername){
  return ctx.setState(
    produce((draft) => {
      draft.recipient.username = username;
    })
  );
  }
}
//============================================================================================

 