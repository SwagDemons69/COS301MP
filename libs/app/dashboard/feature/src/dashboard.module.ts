import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/ui';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardPage } from './dashboard.page';
import { DashboardRouting } from './dashboard.routing';
import { DashboardModule  as DashData } from '@mp/app/dashboard/data-access';
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DashboardRouting,
    ProfileModule,
    NgxSkeletonLoaderModule,
    DashData
  ],
  declarations: [DashboardPage],
})
export class DashboardModule {}
