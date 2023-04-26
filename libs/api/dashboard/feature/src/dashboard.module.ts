import { DashboardModule as DashboardDataAccessModule } from '@mp/api/dashboard/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRecommendedPostsCommandHandler, GetTrendingPostsCommandHandler } from './commands';
import { DashboardServices } from './dashboard.services';
import { CreateRecommendedPostEventHandler, CreateTrendingPostEventHandler } from './events';
export const CommandHandlers = [ 
    GetRecommendedPostsCommandHandler,
    GetTrendingPostsCommandHandler,
  ];
export const EventHandlers = [ 
    CreateRecommendedPostEventHandler, 
    CreateTrendingPostEventHandler 
];

@Module({
  imports: [CqrsModule, DashboardDataAccessModule],
  providers: [
    DashboardServices,
     ...CommandHandlers,
     ...EventHandlers
  ],
  exports: [DashboardServices],
})
export class DashboardModule {}