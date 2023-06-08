import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, LoginGuard } from '@app/core/guards';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((mod) => mod.AuthModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((mod) => mod.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./statistics/statistics.module').then((mod) => mod.StatisticsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'word-cloud',
    loadChildren: () => import('./word-cloud/word-cloud.module').then((mod) => mod.WordCloudModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'board/:id',
    loadChildren: () => import('./board/board.module').then((mod) => mod.BoardModule),
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
