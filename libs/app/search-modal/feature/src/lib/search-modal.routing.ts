import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { searchmodalPage } from './search-modal.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: searchmodalPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class searchmodalRouting {}