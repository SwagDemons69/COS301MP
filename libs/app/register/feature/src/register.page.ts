import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Register } from '@mp/app/register/util';
import {
    ActionsExecuting,
    actionsExecuting
} from '@ngxs-labs/actions-executing';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'ms-register-page',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @Select(actionsExecuting([Register]))
  busy$!: Observable<ActionsExecuting>;
  registerForm = this.fb.group({
    email: [
      '',
      [Validators.email, Validators.minLength(6), Validators.maxLength(64)],
    ],
    username: ['', [Validators.minLength(3), Validators.maxLength(64)]],
    password: ['', [Validators.minLength(6), Validators.maxLength(64)]],
    confirmPassword: ['', [Validators.minLength(6), Validators.maxLength(64)]],
  });

  // matchValues(matchTo: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[matchTo];
  //     const matchingControl = formGroup.controls['confirmPassword'];

  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ passwordMismatch: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }

  showPassword = false;
 

  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
  get usernameError(): string {
    if (this.username?.errors?.['username']) return 'username is invalid';
    if (this.username?.errors?.['required']) return 'username is required';
    if (this.username?.errors?.['minlength'])
      return 'username should be longer than 6 characters';
    if (this.username?.errors?.['maxlength'])
      return 'username should be shorter than 64 characters';

    return 'Email is invalid';
  }
  get emailError(): string {
    if (this.email?.errors?.['email']) return 'Email is invalid';
    if (this.email?.errors?.['required']) return 'Email is required';
    if (this.email?.errors?.['minlength'])
      return 'Email should be longer than 6 characters';
    if (this.email?.errors?.['maxlength'])
      return 'Email should be shorter than 64 characters';

    return 'Email is invalid';
  }

  get passwordError(): string {
    if (this.password?.errors?.['required']) return 'Password is required';
    if (this.password?.errors?.['minlength'])
      return 'Password should be longer than 6 characters';
    if (this.password?.errors?.['maxlength'])
      return 'Password should be shorter than 64 characters';

    return 'Password is invalid';
  }
  get confirmPasswordError(): string {  
    if (this.password?.value !== this.confirmPassword?.value) return 'Passwords do not match';
  
    return 'Confirm password is invalid';
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store
  ) {}

  register() {
    if (this.registerForm.valid && this.password?.value === this.confirmPassword?.value) {
      this.store.dispatch(new Register());
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
