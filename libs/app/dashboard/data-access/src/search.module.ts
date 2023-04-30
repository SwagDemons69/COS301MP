import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { SearchApi } from './search.api';

@NgModule({
  imports: [CommonModule, AuthModule],
  providers: [SearchApi],
})
export class SearchModule {
}