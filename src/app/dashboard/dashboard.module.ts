import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';

import { MainBoardsComponent } from './main-boards/main-boards.component';

@NgModule({
  declarations: [DashboardComponent, MainBoardsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
