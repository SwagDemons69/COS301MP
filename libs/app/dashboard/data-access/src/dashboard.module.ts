import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './dashboard.state';
import { DashboardApi } from './dashboard.api';
import { HomeModule } from '@mp/app/home/feature';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([DashboardState]), AuthModule, HomeModule],
  providers: [DashboardApi],
})
export class DashboardModule {}
