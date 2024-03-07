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
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { LogoWelcomeComponent } from './components/login/logo-welcome/logo-welcome.component';
import { NavBarComponent } from './components/main-page/nav-bar/nav-bar.component';
import { FunctionKeyComponent } from './components/main-page/function-key/function-key.component';
import { FunctionKey1Component } from './components/main-page/function-key-1/function-key-1.component';
import { FunctionKey2Component } from './components/main-page/function-key-2/function-key-2.component';
import { FunctionKey3Component } from './components/main-page/function-key-3/function-key-3.component';
import { FunctionKey4Component } from './components/main-page/function-key-4/function-key-4.component';
import { FunctionKey5Component } from './components/main-page/function-key-5/function-key-5.component';
import { FunctionKey6Component } from './components/main-page/function-key-6/function-key-6.component';
import { PunchScreenComponent } from './components/fk-components/punch-screen/punch-screen.component';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { LevelChangeComponent } from './components/fk-components/level-change/level-change.component';
import { ViewLastPunchComponent } from './components/fk-components/view-last-punch/view-last-punch.component';
import { ViewTotalHoursComponent } from './components/fk-components/view-total-hours/view-total-hours.component';
import { BreakLunchComponent } from './components/fk-components/break-lunch/break-lunch.component';
import { HourAmountPcComponent } from './components/fk-components/hour-amount-pc/hour-amount-pc.component';
import { CodeDialogComponent } from './components/fk-components/code-dialog/code-dialog.component';
import { PayCodeDialogComponent } from './components/fk-components/pay-code-dialog/pay-code-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    LoginComponent,
    LoginFormComponent,
    LogoWelcomeComponent,
    NavBarComponent,
    FunctionKeyComponent,
    FunctionKey1Component,
    FunctionKey2Component,
    FunctionKey3Component,
    FunctionKey4Component,
    FunctionKey5Component,
    FunctionKey6Component,
    PunchScreenComponent,
    DateTimeComponent,
    LevelChangeComponent,
    ViewLastPunchComponent,
    ViewTotalHoursComponent,
    BreakLunchComponent,
    HourAmountPcComponent,
    CodeDialogComponent,
    PayCodeDialogComponent
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
