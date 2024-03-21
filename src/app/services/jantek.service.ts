import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PunchConfig } from '../models/punch-config';
import { FunctionKey } from '../models/function-key';
import { CompanyInfo } from '../models/company-info';
import { CodeList } from '../models/code-list';
import { CodeStatus, L3CodeStatus } from '../models/code-status';
import { EmployeeStatus } from '../models/employee-status';

const apiRoot = "http://201.12.20.40/timothy_jan/sqlwebpunch";

@Injectable({
  providedIn: 'root'
})
export class JantekService {
  isAuthenticatedChange: Subject<boolean> = new Subject<boolean>();
  companyName:string = "";

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
    status: "OK",
    logintype: 3,
    clocktype: 1,
    checklo: 0,
    closetable: 2,
    lunchlock: 1,
    lunchlen: 30,
    breaklock: 0,
    breaklen: 0,
    fk1: {
      "fktype": 18,
      "caption": "View Last Punch",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    fk2: {
      "fktype": 4,
      "caption": "Swipe and Go and Level 3",
      "msg1": "Enter Level 3",
      "msg2": "",
      "msg3": "",
      "PC": 0
    },
    fk3: {
      "fktype": 11,
      "caption": "Level 1/2/3 Change",
      "msg1": "Enter Level 1",
      "msg2": "Enter Level 2",
      "msg3": "Enter Level 3",
      "PC": 0
    },
    fk4: {
      "fktype": 16,
      "caption": "Hour Entry",
      "msg1": "Enter Hours",
      "msg2": "",
      "msg3": "",
      "PC": 4
    },
    fk5: {
      "fktype": 17,
      "caption": "Amount Entry",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 5
    },
    fk6: {
      "fktype": 20,
      "caption": "Calculated Pay Code",
      "msg1": "",
      "msg2": "",
      "msg3": "",
      "PC": 6
    }
  };

  // punchConfiguration: PunchConfig = {
  //   "status": "OK",
  //   "logintype": 2,
  //   "clocktype": 1,
  //   "checklo": 0,
  //   "closetable": 2,
  //   "lunchlock": 1,
  //   "lunchlen": 30,
  //   "breaklock": 0,
  //   "breaklen": 0,
  //   "fk1": {
  //     "fktype": 5,
  //     "caption": "Level 1 Change",
  //     "msg1": "Enter Level 1",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk2": {
  //     "fktype": 6,
  //     "caption": "Level 2 Change",
  //     "msg1": "Enter Level 2",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk3": {
  //     "fktype": 7,
  //     "caption": "Level 3 Change",
  //     "msg1": "Enter Level 3",
  //     "msg2": "",
  //     "msg3": "",
  //     "PC": 0
  //   },
  //   "fk4": {
  //     "fktype": 8,
  //     "caption": "Level 1/2 Change",
  //     "msg1": "Enter Level 1",
  //     "msg2": "Enter Level 2",
  //     "msg3": "",
  //     "PC": 4
  //   },
  //   "fk5": {
  //     "fktype": 9,
  //     "caption": "Level 1/3 Change",
  //     "msg1": "Enter Level 1",
  //     "msg2": "Enter Level 3",
  //     "msg3": "",
  //     "PC": 5
  //   },
  //   "fk6": {
  //     "fktype": 10,
  //     "caption": "Level 2/3 Change",
  //     "msg1": "Enter Level 2",
  //     "msg2": "Enter Level 3",
  //     "msg3": "",
  //     "PC": 6
  //   }
  // };

  /** -DEMO ONLY */

  employeeStatus: EmployeeStatus = {
    status: "",
    cardnum: 0,
    found: 0,
    empid: "",
    lastname: "",
    firstname: ""
  }

  constructor(
    private _alertService: AlertService,
    private http: HttpClient
  ) { }

  /** Https request to get punch configuration from server */
  // getPunchConfiguration() : Observable<PunchConfig> {
  //   const options = {
  //     params: {
  //       Company: "TIMOTHYJANPROJECT",
  //     }
  //   };
  //   return this.http.get<PunchConfig>(`${apiRoot}/swp_getpunchcfg.asp`, options);
  // }
  /** FOR TESTING WITH DIFFERENT PUNCH CONFIG ONLY */
  getPunchConfiguration() {
    return this.punchConfiguration;
  }

  /** Return current Login Type */
  getLoginType(): number {
    return this.punchConfiguration.logintype;
  }

  /** Checks if Employee ID exists */
  getEmployeeIDStatus(employeeID: number): Observable<EmployeeStatus> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
        EmpID:employeeID,
      }
    };
    return this.http.get<EmployeeStatus>(`${apiRoot}/swp_chkempid.asp`, options);
  }

  /** Checks if Employee ID exists */
  getCardNumberStatus(cardNumber: number): Observable<EmployeeStatus> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
        cardnum: cardNumber,
      }
    };
    return this.http.get<EmployeeStatus>(`${apiRoot}/swp_chkcardnum.asp`, options);
  }

  /** Authenticate to access other functions */
  login(): void {
    this.isAuthenticatedChange.next(true);
    this._alertService.openSnackBar("Login Successful");
  }

  /** Login information is incorrect */
  invalidLogin(): void {
    this.isAuthenticatedChange.next(false);
    this._alertService.openSnackBar("Invalid Login");
  }

  /** Log Off */
  logoff() {
    this.isAuthenticatedChange.next(false);
    this._alertService.openSnackBar("Logoff Successful");
  }

  /** Incomplete */
  /** Https request to gets company info from server */
  getCompanyInfo(): Observable<CompanyInfo> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
      }
    };
    return this.http.get<CompanyInfo>(`${apiRoot}/swp_getinfo.asp`, options)
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

  /** Https request to get list of level 1 codes */
  getLevel1Codes(): Observable<CodeList> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
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
        Company: "TIMOTHYJANPROJECT",
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
        Company: "TIMOTHYJANPROJECT",
        order:1,
        startloc:1,
        listsize:100
      }
    };
    return this.http.get<CodeList>(`${apiRoot}/swp_GetL3List.asp`, options);
  }

  /** Check if L1 code exists */
  checkL1CodeExists(code:number): Observable<CodeStatus> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
        l1code:code,
      }
    };
    return this.http.get<CodeStatus>(`${apiRoot}/swp_chkL1.asp`, options);
  }

  /** Check if L2 code exists */
  checkL2CodeExists(code:number): Observable<CodeStatus> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
        l2code:code,
      }
    };
    return this.http.get<CodeStatus>(`${apiRoot}/swp_chkL2.asp`, options);
  }

  /** Check if L3 code exists
   * INCOMPLETE
  */
  checkL3CodeExists(code:number): Observable<L3CodeStatus> {
    const options = {
      params: {
        Company: "TIMOTHYJANPROJECT",
        empid: this.employeeStatus.empid,
        l3code:code,
      }
    };
    return this.http.get<L3CodeStatus>(`${apiRoot}/swp_chkL3.asp`, options);
  }

  /** Invalid level change */
  invalidLevel(): void {
    this._alertService.openSnackBar("Invalid Level Change!");
  }

  /** Https request to get list of pay codes */
  getPayCodes(fktype: number): Observable<CodeList> {
    switch(fktype) {
      /** "HNC" - Hourly non-calculated (employee enters hour value) */
      case 16: {
        const options = {
          params: {
            Company: "TIMOTHYJANPROJECT",
            pctype: "HNC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<CodeList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      /** "ED" - Earning/Deduction code (employee enters dollar amount) */
      case 17: {
        const options = {
          params: {
            Company: "TIMOTHYJANPROJECT",
            pctype: "ED",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<CodeList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      /** "HC" - Hourly Calculated (excluding pacyode 0) */
      case 20: {
        const options = {
          params: {
            Company: "TIMOTHYJANPROJECT",
            pctype: "HC",
            order:1,
            startloc:1,
            listsize:100
          }
        };
        return this.http.get<CodeList>(`${apiRoot}/swp_GetPcList.asp`, options);
      }
      default: {
        console.log("switch default");
        return this.http.get<CodeList>(`${apiRoot}/swp_GetPcList.asp?Company=TIMOTHYJANPROJECT&pctype=HNC&order=1&startloc=1&listsize=100`);
      }
    }
  }

  /** Valid level change */
  postPunch(form: any) {
    console.log(form);
    this._alertService.openSnackBar("Punch Recorded!");
  }

}
