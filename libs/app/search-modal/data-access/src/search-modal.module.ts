import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { SearchModalApi } from './search-modal.api'

@NgModule({
  imports: [CommonModule, AuthModule],
  providers: [SearchModalApi],
})
export class SearchModalModule {}