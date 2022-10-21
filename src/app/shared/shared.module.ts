import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderModule } from '@app/header/header.module';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [MaterialModule, HeaderModule],
})
export class SharedModule {}
