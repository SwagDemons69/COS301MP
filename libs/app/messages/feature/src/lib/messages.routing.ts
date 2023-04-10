import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesPage } from './messages.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MessagesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRouting {}
