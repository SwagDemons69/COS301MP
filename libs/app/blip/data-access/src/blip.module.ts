import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { blipAPI } from './blip.api';

@NgModule({
  imports: [CommonModule,
    AuthModule],
  providers: [blipAPI],
})
export class BlipModule {}