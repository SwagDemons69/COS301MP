import { Module } from '@nestjs/common';
import { FeedRepository } from './like.repository';

@Module({
  providers: [FeedRepository],
  exports: [FeedRepository],
})
export class FeedModule {}
