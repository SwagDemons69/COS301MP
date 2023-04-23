import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SearchModalPage } from './search-modal.page';
import { SearchModalRouting } from './search-modal.routing';
import { SearchModalModule as DataAccessSearchModalModule } from '@mp/app/search-modal/data-access';

@NgModule({
  imports: [CommonModule, IonicModule, SearchModalRouting, DataAccessSearchModalModule],
  exports: [SearchModalPage],
  declarations: [SearchModalPage],
})
export class SearchModalModule{}
