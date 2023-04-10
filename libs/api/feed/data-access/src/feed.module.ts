import { Module } from '@nestjs/common';
import { FeedRepository } from './feed.repository';

@Module({
  providers: [FeedRepository],
  exports: [FeedRepository],
})
export class FeedModule {}
