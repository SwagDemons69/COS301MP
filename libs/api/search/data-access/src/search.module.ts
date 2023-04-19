import { Module } from '@nestjs/common';
import { SearchRepository } from './search.repository';

@Module({
  providers: [SearchRepository],
  exports: [SearchRepository],
})
export class SearchModule {}