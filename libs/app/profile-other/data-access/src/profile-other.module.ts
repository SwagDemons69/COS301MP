import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
// import { profileOtherAPI } from './profile-other.api';

@NgModule({
  imports: [CommonModule, AuthModule],
  // providers: [profileOtherAPI]
})
export class ProfileOtherModule {}
