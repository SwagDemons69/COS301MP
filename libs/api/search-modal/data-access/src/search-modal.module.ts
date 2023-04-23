import { Module } from '@nestjs/common';
import { SearchModalRepository } from './search-modal.repository';

@Module({
  providers: [SearchModalRepository],
  exports: [SearchModalRepository],
})
export class SearchModalModule {}