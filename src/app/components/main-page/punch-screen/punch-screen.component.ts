import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-punch-screen',
  templateUrl: './punch-screen.component.html',
  styleUrl: './punch-screen.component.css'
})
export class PunchScreenComponent implements OnInit{
  isAdmin: boolean = false;
  clocktype: string = "";
  currentDateTime = new Date();
  punchForm: FormGroup = new FormGroup({
    user: new FormControl({value: "", disabled: true}, Validators.required),
    punch: new FormControl("", Validators.required),
    currentDateTime: new FormControl("", Validators.required),
  });

  constructor(
    private _jantekService: JantekService
  ){}

  ngOnInit(): void {
    /** Needed to get the punchconfig including clocktype */
    this._jantekService.getPunchConfiguration();
    this.clocktype = this.FkClockTypeDesc(
      this._jantekService.getClockType()
    );
  }

  FkClockTypeDesc(clocktype:Number): string {
    /** Returns clock type for the NgSwitch */
    var desc = "";
    switch (clocktype) {
      case 1:
        desc = "In and Out";
        break;
      case 2:
        desc = "Swipe and Go";
        break;
      case 3:
        desc = "Swipe and Go (Function Key)";
        break;
      default:
        desc = "?";
    }
    return desc;
  }

  onPunchIn() {
    this.punchForm.controls['punch'].setValue("IN");
    this.currentDateTime = new Date();
    this.punchForm.controls['currentDateTime'].setValue(this.currentDateTime);
    if (this.punchForm.valid) {
      this._jantekService.punch(this.punchForm.value);
    }
  }

  onPunchOut() {
    this.punchForm.controls['punch'].setValue("OUT:");
    this.currentDateTime = new Date();
    this.punchForm.controls['currentDateTime'].setValue(this.currentDateTime);
    if (this.punchForm.valid) {
      this._jantekService.punch(this.punchForm.value);
    }
  }

  onPunchSwipeAndGo() {
    this.punchForm.controls['punch'].setValue("SWIPEANDGO:", );
    this.currentDateTime = new Date();
    this.punchForm.controls['currentDateTime'].setValue(this.currentDateTime);
    if (this.punchForm.valid) {
      this._jantekService.punch(this.punchForm.value);
    }
  }
}
