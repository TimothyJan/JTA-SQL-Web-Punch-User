import { Component, Input, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JantekService } from '../../../services/jantek.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-level-change',
  templateUrl: './level-change.component.html',
  styleUrl: './level-change.component.css'
})
export class LevelChangeComponent implements OnInit{
  @Input() functionKeyNumber: number = 0;

  msg1Disabled: boolean = true;
  msg2Disabled: boolean = true;
  msg3Disabled: boolean = true;

  fk: FunctionKey = {
    "fktype": 1,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };

  levelChangeForm = new FormGroup({
    msg1Input: new FormControl({value: "", disabled: true}, [Validators.required]),
    msg2Input: new FormControl({value: "", disabled: true}, [Validators.required]),
    msg3Input: new FormControl({value: "", disabled: true}, [Validators.required]),
  })

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this.fk = this._jantekService.getFunctionKeyInfo(this.functionKeyNumber);
    if(this.fk["msg1"]) {
      this.enableMsg1();
    }
    if(this.fk["msg2"]) {
      this.enableMsg2();
    }
    if(this.fk["msg3"]) {
      this.enableMsg3();
    }
  }

  /** Enable Msg 1 input and dialog */
  enableMsg1(): void {
    this.msg1Disabled = false;
    this.levelChangeForm.controls["msg1Input"].enable();
  }

  /** Disable Msg 1 input and dialog */
  disableMsg1():void {
    this.msg1Disabled = true;
    this.levelChangeForm.controls["msg1Input"].disable();
  }

  /** Enable Msg 2 input and dialog */
  enableMsg2(): void {
    this.msg2Disabled = false;
    this.levelChangeForm.controls["msg2Input"].enable();
  }

  /** Disable Msg 2 input and dialog */
  disableMsg2():void {
    this.msg2Disabled = true;
    this.levelChangeForm.controls["msg2Input"].disable();
  }

  /** Enable Msg 3 input and dialog */
  enableMsg3(): void {
    this.msg3Disabled = false;
    this.levelChangeForm.controls["msg3Input"].enable();
  }

  /** Disable Msg 3 input and dialog */
  disableMsg3():void {
    this.msg3Disabled = true;
    this.levelChangeForm.controls["msg3Input"].disable();
  }

  openCodeMsg1Dialog(): void {
    console.log("msg1 Dialog");
  }

  openCodeMsg2Dialog(): void {
    console.log("msg2 Dialog");
  }

  openCodeMsg3Dialog(): void {
    console.log("msg3 Dialog");
  }

  /**  */
  onSubmit(): void {
    if (this.levelChangeForm.valid) {
      this._jantekService.levelChangeUpdate(this.levelChangeForm.value);
    }
  }

}
