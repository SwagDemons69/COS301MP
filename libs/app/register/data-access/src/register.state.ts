import { Injectable } from '@angular/core';
import { Register as AuthRegister } from '@mp/app/auth/util';
import { SetError } from '@mp/app/errors/util';
import { Register } from '@mp/app/register/util';
import { Action, State, StateContext } from '@ngxs/store';

export interface RegisterStateModel {
  registerForm: {
    model: {
      username: string | null;
      email: string | null;
      password: string | null;
    };
    dirty: false;
    status: string;
    errors: object;
  };
}

@State<RegisterStateModel>({
  name: 'register',
  defaults: {
    registerForm: {
      model: {
        username: null,
        email: null,
        password: null,
      },
      dirty: false,
      status: '',
      errors: {},
    },
  },
})
@Injectable()
export class RegisterState {
  @Action(Register)
  async register(ctx: StateContext<RegisterStateModel>) {
    try {
      const state = ctx.getState();
      const username = state.registerForm.model.username;
      const email = state.registerForm.model.email;
      const password = state.registerForm.model.password;
      //console.log(ctx.getState().registerForm.model.username)
      if (email && password) {
        return ctx.dispatch(new AuthRegister(email, password));
      }
      return ctx.dispatch(new SetError('Email, password or username not set'));
    } catch (error) {
      return ctx.dispatch(new SetError((error as Error).message));
    }
  }
}
