import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared/shared.module';
import { HeaderModule } from '@app/header/header.module';

import { MainboardsComponent } from './mainboards/mainboards.component';

@NgModule({
  declarations: [DashboardComponent, MainboardsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, HeaderModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
