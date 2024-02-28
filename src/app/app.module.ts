import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { OrganizerComponent } from './components/organizer/organizer.component';
import { LoginComponent } from './components/login/login.component';
import { FunctionKeyListComponent } from './components/function-key-list/function-key-list.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LogoWelcomeComponent } from './components/login/logo-welcome/logo-welcome.component';
import { MainPageComponent } from './components/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    LoginComponent,
    FunctionKeyListComponent,
    LoginFormComponent,
    LogoWelcomeComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
