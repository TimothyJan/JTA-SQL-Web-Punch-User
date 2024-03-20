import { Component, OnInit } from '@angular/core';
import { JantekService } from '../../../services/jantek.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeStatus } from '../../../models/employee-status';

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
  validLogin: boolean = false;

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

  /** Gets EmployeeStatus using the Employee ID and assigns if valid login*/
  async getEmployeeIDStatus(employeeID: any): Promise<EmployeeStatus> {
    return new Promise<EmployeeStatus>((resolve, reject) => {
      this._jantekService.getEmployeeIDStatus(+employeeID).subscribe(
        data => {
          if (data["found"] > 0) {
            this.isValidLogin();
            resolve(data);
          } else {
            this.isInvalidLogin();
            resolve(data);
          }
        },
        error => {
            console.error("Error checking Employee ID existence:", error);
            reject(error);
        }
      );
    });
  }

  /** Gets EmployeeStatus using the Card Number and assigns if valid login*/
  async getCardNumberStatus(cardNumber: any): Promise<EmployeeStatus> {
    return new Promise<EmployeeStatus>((resolve, reject) => {
      this._jantekService.getCardNumberStatus(+cardNumber).subscribe(
        data => {
          if (data["found"] > 0) {
            this.isValidLogin();
            resolve(data);
          } else {
            this.isInvalidLogin();
            resolve(data);
          }
        },
        error => {
            console.error("Error checking Card Number existence:", error);
            reject(error);
        }
      );
    });
  }

  /** Compares Employee ID data and Card Number data exist and match */
  compareEmployeeStatuses(promise1: Promise<EmployeeStatus>, promise2: Promise<EmployeeStatus>): Promise<boolean> {
    return Promise.all([promise1, promise2]).then(([obj1, obj2]) => {
      // Check if values of all properties are equal
      return obj1.status === obj2.status &&
              obj1.cardnum === obj2.cardnum &&
              obj1.found === obj2.found &&
              obj1.empid === obj2.empid &&
              obj1.lastname === obj2.lastname &&
              obj1.firstname === obj2.firstname;
    });
  }

  isInvalidLogin(): void {
    this.validLogin = false;
  }

  isValidLogin(): void {
    this.validLogin = true;
  }

  /** Checks if login form has valid login information */
  async onLogin() {
    if (this.loginForm.valid) {
      switch(this.logintype) {
        case 1: // Employee and Card Number INCOMPLETE
          await this.compareEmployeeStatuses(this.getEmployeeIDStatus(this.loginForm.controls.employeeID.value), this.getCardNumberStatus(this.loginForm.controls.cardNumber.value));
          this._jantekService.employeeStatus = await this.getCardNumberStatus(this.loginForm.controls.cardNumber.value);
          break;
        case 2: // Employee ID Only
          this._jantekService.employeeStatus = await this.getEmployeeIDStatus(this.loginForm.controls.employeeID.value);
          break;
        case 3: // Card Number Only
          this._jantekService.employeeStatus = await this.getCardNumberStatus(this.loginForm.controls.cardNumber.value);
          break;
      }
    }
    // If Valid Login enable features and reroute to punch-screen
    if (this.validLogin) {
      this._jantekService.login();
      this.router.navigate(["punch-screen"]);
    } else {
      this._jantekService.invalidLogin();
    }
    this.loginForm.reset();
  }

}
