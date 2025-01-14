import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileOtherComponent } from './profile-other.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProfileOtherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileOtherRouting {}
