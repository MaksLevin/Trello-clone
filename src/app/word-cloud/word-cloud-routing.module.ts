import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WordCloudComponent } from './word-cloud.component';

const routes: Routes = [{ path: '', component: WordCloudComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WordCloudRoutingModule {}
