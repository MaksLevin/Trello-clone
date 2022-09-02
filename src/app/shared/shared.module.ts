import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatChipsModule,
    MatSnackBarModule,
  ],
})
export class SharedModule {}
