import { Component } from '@angular/core';
import { user_profile } from '@mp/api/profiles/util';
import { ProfileState } from '@mp/app/profile/data-access';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { post } from '@mp/api/home/util';

@Component({
  selector: 'ms-profile-page',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  @Select(ProfileState.profile) profile$!: Observable<user_profile | null>;
  @Select(ProfileState.posts) posts$!: Observable<post | null>;
}
