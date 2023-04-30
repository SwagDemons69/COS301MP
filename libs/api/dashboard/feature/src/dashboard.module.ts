import { DashboardModule as DashboardDataAccessModule } from '@mp/api/dashboard/data-access';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetRecommendedPostsCommandHandler, GetTrendingPostsCommandHandler } from './commands';
import { DashboardServices } from './dashboard.services';
import { CreateRecommendedPostEventHandler, CreateTrendingPostEventHandler } from './events';
import { GetBlipContentQueryHandler } from './queries';
export const CommandHandlers = [ 
    GetRecommendedPostsCommandHandler,
    GetTrendingPostsCommandHandler,
  ];
export const EventHandlers = [ 
    CreateRecommendedPostEventHandler, 
    CreateTrendingPostEventHandler 
];
export const QueryHandlers = [
    GetBlipContentQueryHandler
]

@Module({
  imports: [CqrsModule, DashboardDataAccessModule],
  providers: [
    DashboardServices,
     ...CommandHandlers,
     ...EventHandlers,
     ...QueryHandlers
  ],
  exports: [DashboardServices],
})
export class DashboardModule {}