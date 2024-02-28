import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PunchConfig } from '../models/punch-config';

const apiRoot = "http://201.12.20.40/timothy_jan/sqlwebpunch";

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();

  /** DEMO ONLY */
  demoEmployeeNumber:number = 202;
  demoCardNumber:number = 202;
  punchConfiguration: PunchConfig = {
    "status": "OK",
    "logintype": 1,
    "clocktype": 1,
    "checklo": 0,
    "closetable": 2,
    "lunchlock": 1,
    "lunchlen": 30,
    "breaklock": 0,
    "breaklen": 0,
    "fk1": {
      "fktype": 18,
      "caption": "View Last Punch",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk2": {
      "fktype": 19,
      "caption": "View Total Hour",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk3": {
      "fktype": 5,
      "caption": "Company Change",
      "msg1": "Enter Company",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk4": {
      "fktype": 6,
      "caption": "Branch Change",
      "msg1": "Enter Branch",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk5": {
      "fktype": 7,
      "caption": "Dept Change",
      "msg1": "Enter Department",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk6": {
      "fktype": 17,
      "caption": "Tip Entry",
      "msg1": "Enter Tip",
      "msg2": "",
      "msg3": "",
      "PC": 7
    }
  };

  /** DEMO ONLY */

  constructor(
    private _alertService: AlertService,
    private http: HttpClient
  ) { }

  /** INCOMPLETE */
  /** Https request to get punch configuration from server */
  getPunchConfiguration(): Observable<PunchConfig> {
    return this.http.get<PunchConfig>(`${apiRoot}/swp_getpunchcfg.asp`);
  }

  /** Return current Login Type */
  getLoginType(): number {
    return this.punchConfiguration.logintype;
  }

  /** Check user in database and login*/
  login(form: any): boolean {
    // Admin Authentication
    if(form.employeeNumber == this.demoEmployeeNumber && form.cardNumber == this.demoCardNumber) {
      this.isAuthenticatedChange.next(true);
      this._alertService.openSnackBar("Login Successful");
      // get punch configuration
      this.getPunchConfiguration().subscribe(
        data => this.punchConfiguration = { ...data}
      );
      return true;
    }
    this._alertService.openSnackBar("Incorrect Login");
    return false;
  }

  /** Log Off */
  logoff() {
    this.isAuthenticatedChange.next(false);
    this._alertService.openSnackBar("Logoff Successful");
  }

  /** Returns current Clock Type */
  getClockType(): number {
    return this.punchConfiguration.clocktype;
  }

}
