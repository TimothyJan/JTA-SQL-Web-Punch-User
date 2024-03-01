import { Component, OnInit } from '@angular/core';
import { JantekService } from '../../services/jantek.service';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.css'
})
export class DateTimeComponent implements OnInit{
  currentDateTime = new Date();
  timeFormat: string = "";
  dateFormat: string = "";

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    /** Needed to get the company info including timeformat and dateformat */
    this._jantekService.getCompanyInfo();

    this.currentDateTimeUpdate();
    this.timeFormat = this.timeFormatDisplay(this._jantekService.getTimeFormat());
    this.dateFormat = this._jantekService.dateFormatDisplay(this._jantekService.getDateFormat());
  }

  /** Updates currentDateTime every 1 sec */
  currentDateTimeUpdate(): void {
    setInterval(() => {
      this.currentDateTime = new Date();
    }, 1000);
  }

  /** Returns the time format display to be used in the pipe of the time */
  timeFormatDisplay(timeformat: number): string {
    let desc = "";
    if (timeformat === 0) {
      // "am/pm"
      desc = "h:mm:ss a";
    } else {
      // "military"
      desc = "H:mm";
    }
    return desc;
  }

}
