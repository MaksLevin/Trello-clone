import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardRoutingModule } from './board-routing.module';
import { BoardComponent } from './board.component';
import { HeaderModule } from '@app/header/header.module';
import { SharedModule } from '@app/shared/shared.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [BoardComponent, ListComponent],
  imports: [CommonModule, BoardRoutingModule, HeaderModule, SharedModule],
})
export class BoardModule {}
