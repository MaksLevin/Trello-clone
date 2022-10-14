import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, LoginGuard } from '@app/core/guards';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then((mod) => mod.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: '404',
    loadChildren: () => import('./not-found/not-found.module').then((mod) => mod.NotFoundModule),
  },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
