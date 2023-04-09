import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { ProfileState } from './dashboard.state';
import { DashboardApi } from './dashboard.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([ProfileState]), AuthModule],
  providers: [DashboardApi],
})
export class ProfileModule {}
