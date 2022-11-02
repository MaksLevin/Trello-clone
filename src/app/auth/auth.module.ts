import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  exports: [AuthComponent],
})
export class LoginModule {}
