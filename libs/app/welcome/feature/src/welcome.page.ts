import { Component } from '@angular/core';
import { ContinueWithGoogle } from '@mp/app/welcome/util';
import { Store } from '@ngxs/store';


@Component({
  selector: 'ms-welcome-page',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  constructor(private readonly store: Store) {}

  continueWithGoogle() {
    this.store.dispatch(new ContinueWithGoogle());
  }
}
