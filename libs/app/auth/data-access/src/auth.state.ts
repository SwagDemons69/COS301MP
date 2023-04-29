import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
    ContinueWithGoogle,
    Login,
    Logout,
    Register,
    SetUser,
    SubscribeToAuthState
} from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Navigate } from '@ngxs/router-plugin';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { tap } from 'rxjs';
import { AuthApi } from './auth.api';

export interface AuthStateModel {
  user: User | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    username: ""
  },
})
@Injectable()
export class AuthState {
  constructor(private readonly authApi: AuthApi) {}

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Action(SubscribeToAuthState)
  public subscribeToAuthState(ctx: StateContext<AuthStateModel>) {
    return this.authApi.auth$().pipe(
      tap((user: User | null) => {
        ctx.dispatch(new SetUser(user));
      })
    );
  }

  @Action(SetUser)
  async setUser(ctx: StateContext<AuthStateModel>, { user }: SetUser) {
    console.log("SETTTING USER")
    //console.log(user)
    ctx.setState(
      produce((draft) => {
        // console.log(draft.user?.displayName)
        // console.log(draft.username)
        draft.user = user;
        if(draft.user && draft.username){
          this.authApi.setUsername(draft.user.uid, draft.username);
        }
        else{
         console.log("user or username is null")
        }
        // console.log(user?.displayName)

        // console.log(user)
        // if(user && draft.user && draft.user.displayName){
        //   draft.user.displayName = user.displayName;
        // }
        //if(draft.user){ draft.user.displayName = ctx.getState().username; };
      })
    );
  }

  @Action(Login)
  async login(ctx: StateContext<AuthStateModel>, { email, password }: Login) {
    try {
      await this.authApi.login(email, password);
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(Register)
  async register(
    ctx: StateContext<AuthStateModel>,
    { email, password, username }: Register
  ) {
    try {
      console.log("AUTH STATE")
      await this.authApi.register(email, password, username);
      ctx.patchState({username: username});
      //console.log("SET STATE: " + ctx.getState().username);
      
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(ContinueWithGoogle)
  async continueWithGoogle(ctx: StateContext<AuthStateModel>) {
    try {
      await this.authApi.continueWithGoogle();
      return ctx.dispatch(new Navigate(['home']));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }

  @Action(Logout)
  async logout(ctx: StateContext<AuthStateModel>) {
    await this.authApi.logout();
    return ctx.dispatch(new Navigate(['/']));
  }
}
