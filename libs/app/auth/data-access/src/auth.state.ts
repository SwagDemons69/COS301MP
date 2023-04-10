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
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
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
    ctx.setState(
      produce((draft) => {
        draft.user = user;
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
    { email, password }: Register
  ) {
    try {
      console.log("AUTH STATE")
      await this.authApi.register(email, password);
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
