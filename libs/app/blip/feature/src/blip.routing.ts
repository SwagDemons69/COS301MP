import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlipComponent } from './blip.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BlipComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlipRouting {}
