import { NgModule } from '@angular/core';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const modules = [
  MatSlideToggleModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
