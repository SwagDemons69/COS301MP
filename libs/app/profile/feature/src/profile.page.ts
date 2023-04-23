import { Component } from '@angular/core';
import { IProfile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @Select(ProfileState.profile) profile$!: Observable<IProfile | null>;

  constructor(private navCtrl: NavController) { } // <-- inject NavController

  goToMessages() {
    this.navCtrl.navigateForward('/home/chat'); // <-- use NavController to navigate to messages page
  }
}
