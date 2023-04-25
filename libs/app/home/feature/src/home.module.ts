import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProfileModule } from '@mp/app/profile/data-access';
import { MessagesModule } from '@mp/app/messages/data-access';
import { HomePage } from './home.page';
import { HomeRouting } from './home.routing';
import {SearchModalModule} from '@mp/app/search-modal/data-access'

@NgModule({
  imports: [CommonModule, IonicModule, ProfileModule, MessagesModule, HomeRouting, SearchModalModule],
  declarations: [HomePage],
})
export class HomeModule {}
// I think we should add the imports here, but I'm not sure