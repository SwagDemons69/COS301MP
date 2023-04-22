import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthModule } from '@mp/app/auth/data-access';
import { NgxsModule } from '@ngxs/store';
import { MessagesState } from './messages.state';
import { MessagesApi } from './messages.api';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([MessagesState]), AuthModule],
  providers: [MessagesApi],
})
export class ProfileModule {}
