import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { searchmodalPage } from './search-modal.page';
import { searchmodalRouting } from './search-modal.routing';


@NgModule({
  imports: [CommonModule, IonicModule, searchmodalRouting],
  exports: [searchmodalPage],
  declarations: [searchmodalPage],
})
export class searchmodalModule{}