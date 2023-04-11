import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@mp/app/dashboard/feature').then((m) => m.DashboardModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('@mp/app/profile/feature').then((m) => m.ProfileModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('@mp/app/messages/feature').then((m) => m.MessagesModule)
      },
      {
        path: 'post',
        loadChildren: () =>
          import('@mp/app/post/feature').then((m) => m.PostModule)
         
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('@mp/app/notifications/feature').then((m) => m.NotificationsModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/dashboard',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home/dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRouting {}
