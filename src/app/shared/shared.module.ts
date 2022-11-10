import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@NgModule({
  declarations: [
    DialogModalComponent
  ],
  imports: [CommonModule],
  exports: [MaterialModule],
})
export class SharedModule {}
