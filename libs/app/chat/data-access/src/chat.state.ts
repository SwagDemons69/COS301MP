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
import { SubscribeToChat, SetChatMessages, SetRecipient } from '@mp/app/chat/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatStateModel {
  username: string;
  pictureUrl: string;
  chats : ChatMessage[]
  recipient: string;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    username: "",
    pictureUrl: "",
    chats: [],
    recipient: ""
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
  static username(state: ChatStateModel) {
    return state.username;
  }

  @Selector()
  static picture(state : ChatStateModel){
    return state.pictureUrl;
  }

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
       .pipe(tap((profile: user_profile) => ctx.dispatch(new SetChatMessages(user.uid, ctx.getState().recipient))));
  }

  @Action(SetChatMessages)
  async SetChatMessages(ctx: StateContext<ChatStateModel>, { sender, reciever }: SetChatMessages){
     console.log("IT SHOULD BE CHANGING WTF")
     //const headers = await this.messagesApi.headers(user);
     console.log(sender + " " + reciever);
     const chats = await this.chatApi.getChatMessages({ sender: sender, reciever: "t2VuWgqzjpOf1CfQSpaEnb3U90cB" });
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

  

//   @Action(Logout)
//   async logout(ctx: StateContext<ProfileStateModel>) {
//     return ctx.dispatch(new AuthLogout());
//   }

//   @Action(SubscribeToProfile)
//   subscribeToProfile(ctx: StateContext<ProfileStateModel>) {
//     const user = this.store.selectSnapshot(AuthState.user);
//     if (!user) return ctx.dispatch(new SetError('User not set'));
//     const defaultForm: edit_profile = {
//       notPublic : "",
//       name : "",
//       username : "",
//       profilePicturePath : "",
//       bio : "",
//       province : ""
//     };

//     ctx.dispatch(new InitForm(defaultForm))

//     return this.profileApi
//       .profile$(user.uid)
//       .pipe(tap((profile: user_profile) => ctx.dispatch(new SetProfile(profile))));
//   }
//   //What does piping do?
//   //I think when profile api retuerns it is stored in profile of type user_profile and on completion of this 
//   //the set profile action is invoked
  
//   @Action(SetProfile)
//   setProfile(ctx: StateContext<ProfileStateModel>, { profile }: SetProfile) {
//     return ctx.setState(
//       produce((draft) => {
//         draft.profile = profile;
//       })
//     );
//   }

//   @Action(InitForm)
//   InitForm(ctx: StateContext<ProfileStateModel>, { form }: InitForm){
//   console.log("INIT FORM")
//   console.log(ctx.getState().form)
//   return ctx.setState(
//     produce((draft) => {
//       draft.form=form;
//     })
//   );
//   }

}
//============================================================================================

 