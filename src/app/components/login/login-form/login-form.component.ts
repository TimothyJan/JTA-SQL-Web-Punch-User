import { Component, OnInit } from '@angular/core';
import { JantekService } from '../../../services/jantek.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
  logintype: number = 0;
  loginForm = new FormGroup({
    employeeID: new FormControl({value:'', disabled:true}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    cardNumber: new FormControl({value:'', disabled:true}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  constructor(
    private _jantekService: JantekService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Initialize punchConfiguration in the Jantek Service
    this._jantekService.getPunchConfiguration();
    // Get logintype for company preferred login
    this.logintype = this._jantekService.getLoginType();
    switch(this.logintype) {
      case 1: {
        this.loginForm.controls["employeeID"].enable();
        this.loginForm.controls["cardNumber"].enable();
        break;
      }
      case 2: {
        this.loginForm.controls["employeeID"].enable();
        this.loginForm.controls["cardNumber"].disable();
        break;
      }
      case 3: {
        this.loginForm.controls["employeeID"].disable();
        this.loginForm.controls["cardNumber"].enable();
        break;
      }
    }
  }

  /** Checks if Employee Number exists and assigns first/last name */
  async checkEmployeeIDExists(employeeID: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._jantekService.checkEmployeeIDExists(+employeeID).subscribe(
        data => {
          console.log(data);
          if (data["found"] > 0) {
            this._jantekService.employeeStatus = data
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
            console.error("Error checking Employee ID existence:", error);
            reject(error);
        }
      );
    });
  }

  /** Checks if Card Number exists and assigns first/last name */
  async checkCardNumberExists(cardnumber: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._jantekService.checkCardNumberExists(+cardnumber).subscribe(
        data => {
          console.log(data);
          if (data["found"] > 0) {
            this._jantekService.employeeStatus = data
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
            console.error("Error checking Card Number existence:", error);
            reject(error);
        }
      );
    });
  }

  /** Checks if login form has valid login information */
  async onLogin() {
    let validLogin = false;
    if (this.loginForm.valid) {
      switch(this.logintype) {
        case 1: // Employee and Card Number
          if (await this.checkEmployeeIDExists(this.loginForm.controls.employeeID.value) && await this.checkCardNumberExists(this.loginForm.controls.cardNumber.value)) {
            validLogin = true;
          }
          break;
        case 2: // Employee ID Only
          if (await this.checkEmployeeIDExists(this.loginForm.controls.employeeID.value)) {
            validLogin = true;
          }
          break;
        case 3: // Card Number Only
          if (await this.checkCardNumberExists(this.loginForm.controls.cardNumber.value)) {
            validLogin = true;
          }
          break;
      }
    }
    if (validLogin) {
      this._jantekService.login();
      this.router.navigate(["punch-screen"]);
    } else {
      this._jantekService.invalidLogin();
    }
    this.loginForm.reset();
  }

}
