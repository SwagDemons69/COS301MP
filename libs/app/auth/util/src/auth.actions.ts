import { User } from '@angular/fire/auth';

export class SubscribeToAuthState {
  static readonly type = '[Auth] SubscribeToAuthState';
}

export class SetUser {
  static readonly type = '[Auth] SetUser';
  constructor(public readonly user: User | null) {}
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class ContinueWithGoogle {
  static readonly type = '[Auth] ContinueWithGoogle';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
