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
  loginForm: FormGroup = new FormGroup({
    employeeNumber: new FormControl({value:'', disabled:true}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    cardNumber: new FormControl({value:'', disabled:true}, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  constructor(
    private _jantekService: JantekService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.logintype = this._jantekService.getLoginType();
    switch(this.logintype) {
      case 1: {
        this.loginForm.controls["employeeNumber"].enable();
        this.loginForm.controls["cardNumber"].enable();
        break;
      }
      case 2: {
        this.loginForm.controls["employeeNumber"].enable();
        this.loginForm.controls["cardNumber"].disable();
        break;
      }
      case 3: {
        this.loginForm.controls["employeeNumber"].disable();
        this.loginForm.controls["cardNumber"].enable();
        break;
      }
    }
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._jantekService.login(this.loginForm.value);
      this.router.navigate(["punch-screen"]);
    }
    this.loginForm.reset();
  }

}
