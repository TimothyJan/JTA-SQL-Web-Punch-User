import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PunchConfig } from '../models/punch-config';
import { FunctionKey } from '../models/function-key';
import { CompanyInfo } from '../models/company-info';
import { CodeList } from '../models/code-list';

const apiRoot = "http://201.12.20.40/timothy_jan/sqlwebpunch";

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();

  /** DEMO ONLY */
  demoEmployeeNumber:number = 202;
  demoCardNumber:number = 202;

  companyInfo: CompanyInfo = {
    status: "OK",
    companyname: "Timothy Jan",
    lvl1label: "Company",
    lvl2label: "Branch",
    lvl3label: "Department",
    lvl3labelshort: "Dept.",
    dateformat: 0,
    timeformat: 0,
    orient: 0,
    size: 1,
    wkstart: 2,
    memfore: 134217728,
    memback: 67108864
  };

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
      "fktype": 4,
      "caption": "Swipe and Go and Level 3",
      "msg1": "Enter Level 3",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk2": {
      "fktype": 5,
      "caption": "Level 1 Change",
      "msg1": "Enter Level 1",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk3": {
      "fktype": 6,
      "caption": "Level 2 Change",
      "msg1": "Enter Level 2",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk4": {
      "fktype": 7,
      "caption": "Level 3 Change",
      "msg1": "Enter Level 3",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    "fk5": {
      "fktype": 8,
      "caption": "Level 1/2 Change",
      "msg1": "Enter Level 1",
      "msg2": "Enter Level 2",
      "msg3": "",
      "PC": 0
    },
    "fk6": {
      "fktype": 9,
      "caption": "Enter Level 1/3 Change",
      "msg1": "Enter Level 1",
      "msg2": "Enter Level 3",
      "msg3": "",
      "PC": 7
    }
  };

  /** -DEMO ONLY */

  constructor(
    private _alertService: AlertService,
    private http: HttpClient
  ) { }

  /** Https request to get punch configuration from server */
  getPunchConfiguration() { //: Observable<PunchConfig> {
    // return this.http.get<PunchConfig>(`${apiRoot}/swp_getpunchcfg.asp`);
    /** TESTING */
    return this.punchConfiguration;
    /** --TESTING */
  }

  /** TESTING */
  /** Check user in database and login*/
  login(form: any): boolean {
    // Admin Authentication
    if(form.employeeNumber == this.demoEmployeeNumber && form.cardNumber == this.demoCardNumber) {
      this.isAuthenticatedChange.next(true);
      this._alertService.openSnackBar("Login Successful");
      /** get punch configuration */
      // this.getPunchConfiguration().subscribe(
      //   data => this.punchConfiguration = { ...data}
      // );

      /** Testing */
      this.getPunchConfiguration();
      /** -Testing */
      return true;
    }
    this._alertService.openSnackBar("Incorrect Login");
    return false;
  }

  /** Return current Login Type */
  getLoginType(): number {
    return this.punchConfiguration.logintype;
  }

  /** Log Off */
  logoff() {
    this.isAuthenticatedChange.next(false);
    this._alertService.openSnackBar("Logoff Successful");
  }

  /** INCOMPLETE */
  /** Https request to gets company info from server */
  getCompanyInfo() {
    return this.http.get<CompanyInfo>(`${apiRoot}/swp_getinfo.asp`);
  }

  /** Returns current Clock Type */
  getClockType(): number {
    return this.punchConfiguration.clocktype;
  }

  /** Returns the DateFormat for date-time */
  getDateFormat() {
    return this.companyInfo.dateformat;
  }

  /** Returns the date format display to be used in the pipe of the date */
  dateFormatDisplay(dateformat: number): string {
    let desc = "";
    switch(dateformat) {
      case 0:
        // "mm/dd/yyyy"
        desc = "EEEE, M/d/y";
        break;
      case 1:
        // "mm/dd/yy"
        desc = "EEEE, M/d/yy";
          break;
      case 2:
        // "dd/mm/yyyy"
        desc = "EEEE, d/M/y";
        break;
      case 3:
        // "dd/mm/yy"
        desc = "EEEE, d/M/yy";
        break;
      case 4:
        // "yyyy/mm/dd"
        desc = "EEEE, y/M/d";
        break;
      case 5:
        // "yy/mm/dd"
        desc = "EEEE, yy/M/d";
        break;
      default: desc = "?";
    }
    return desc;
  }

  /** Returns the TimeFormat for date-time*/
  getTimeFormat() {
    return this.companyInfo.timeformat;
  }

  /** Returns level 1 label */
  getLevel1Label(): string {
    return this.companyInfo.lvl1label;
  }

  getLevel2Label(): string {
    return this.companyInfo.lvl2label;
  }

  getLevel3Label(): string {
    return this.companyInfo.lvl3label;
  }

  getFunctionKeyInfo(functionKeyNumber: number): FunctionKey {
    switch(functionKeyNumber) {
      case 1:
        return this.punchConfiguration.fk1;
      case 2:
        return this.punchConfiguration.fk2;
      case 3:
        return this.punchConfiguration.fk3;
      case 4:
        return this.punchConfiguration.fk4;
      case 5:
        return this.punchConfiguration.fk5;
      case 6:
        return this.punchConfiguration.fk6;
      default:
        return this.punchConfiguration.fk1;
    }
  }

  /** Punch In/Out/SwipeAndGo */
  punch(form: any) {
    console.log(form);
    this._alertService.openSnackBar("Punch Recorded!");
  }

  /** Https request to get list of level 1 codes */
  getLevel1Codes(): Observable<CodeList> {
    const options = {
      params: {
        Company: "TIMOTHYPROJECT",
        order:1,
        startloc:1,
        listsize:100
      }
    };
    return this.http.get<CodeList>(`${apiRoot}/swp_GetL1List.asp`, options);
  }

  /** Https request to get list of level 1 codes */
  getLevel2Codes(): Observable<CodeList> {
    const options = {
      params: {
        Company: "TIMOTHYPROJECT",
        order:1,
        startloc:1,
        listsize:100
      }
    };
    return this.http.get<CodeList>(`${apiRoot}/swp_GetL2List.asp`, options);
  }

  /** Https request to get list of level 1 codes */
  getLevel3Codes(): Observable<CodeList> {
    const options = {
      params: {
        Company: "TIMOTHYPROJECT",
        order:1,
        startloc:1,
        listsize:100
      }
    };
    return this.http.get<CodeList>(`${apiRoot}/swp_GetL3List.asp`, options);
  }

  levelChangeUpdate(form: any) {
    console.log(form);
    this._alertService.openSnackBar("Level Change Recorded!");
  }

}
