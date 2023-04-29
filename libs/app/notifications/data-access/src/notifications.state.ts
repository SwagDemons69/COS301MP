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
import { NotificationsApi } from './notifications.api';
import produce from 'immer';
import { post } from '@mp/api/home/util';
import { doc } from '@firebase/firestore';
import { user } from 'firebase-functions/v1/auth';
import { notification } from '@mp/api/notifications/util';
import { SubscribeToNotifications } from '@mp/app/notifications/util'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NotificationsStateModel {
        notifications: notification[]
}

@State<NotificationsStateModel>({
  name : 'notifications',
  defaults: {
    notifications : []
  }
})


@Injectable()
export class NotificationsState {
  //follower : number;
  constructor(
    private readonly notificationsApi: NotificationsApi,
    private readonly store: Store,
  ) { }



  @Selector()
  static notifications(state: NotificationsStateModel) {
    return state.notifications;
  }

  @Action(SubscribeToNotifications)
  async SubscribeToNotifications(ctx: StateContext<NotificationsStateModel>){
    const user = this.store.selectSnapshot(AuthState.user);
    if (!user) return ctx.dispatch(new SetError('User not set'));

    try{
        return this.notificationsApi.notifications$(user.uid)
        .pipe(tap((notifications: notification[]) => {
            ctx.patchState({ notifications: notifications}
            )
            console.log("NEW NOTIFICATION IN STATE")
        }));
    }
    catch(error){
        return ctx.dispatch(new SetError("Could not retrieve notifications"));
    }
    
    //return this.store.dispatch(new SetHeaders(headers));
  }

  //Update on emulators UI will make it change
}