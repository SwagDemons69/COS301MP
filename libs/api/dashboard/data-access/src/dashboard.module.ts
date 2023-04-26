import { Module } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';

@Module({
  providers: [DashboardRepository],
  exports: [DashboardRepository],
})
export class DashboardModule {}