import { NgModule } from '@angular/core';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';

const modules = [
  MatSlideToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
