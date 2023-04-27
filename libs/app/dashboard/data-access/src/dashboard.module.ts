import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { DashboardState } from './dashboard.state';
import { DashboardApi } from './dashboard.api';
import { SearchModule } from './search.module';
import { profileOtherAPI } from '@mp/app/profile-other/data-access'

@NgModule({
  imports: [CommonModule,
    NgxsModule.forFeature([DashboardState]),
    SearchModule,
    AuthModule],
  providers: [DashboardApi, profileOtherAPI],
})
export class DashboardModule {}