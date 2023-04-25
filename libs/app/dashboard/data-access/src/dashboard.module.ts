import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './dashboard.state';
import { DashboardApi } from './dashboard.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([DashboardState]), AuthModule],
  providers: [DashboardApi],
})
export class DashboardModule {}
