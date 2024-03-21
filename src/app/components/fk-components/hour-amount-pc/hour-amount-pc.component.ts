import { Component, Input, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PayCodeDialogComponent } from '../pay-code-dialog/pay-code-dialog.component';

@Component({
  selector: 'app-hour-amount-pc',
  templateUrl: './hour-amount-pc.component.html',
  styleUrl: './hour-amount-pc.component.css'
})
export class HourAmountPcComponent implements OnInit{
  @Input() functionKeyNumber: number = 0;
  msg1Disabled: boolean = true;

  fk: FunctionKey = {
    "fktype": 1,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };

  payCodeForm = new FormGroup({
    msg1Input: new FormControl({value: "", disabled: true}, [Validators.required]),
    PCInput: new FormControl(0, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });

  constructor(
    private _jantekService: JantekService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fk = this._jantekService.getFunctionKeyInfo(this.functionKeyNumber);
    if(this.fk["msg1"]) {
      this.enableMsg1();
    }
  }

  /** Enable Msg 1 input and dialog */
  enableMsg1(): void {
    this.msg1Disabled = false;
    this.payCodeForm.controls["msg1Input"].enable();
  }

  /** Disable Msg 1 input and dialog */
  disableMsg1():void {
    this.msg1Disabled = true;
    this.payCodeForm.controls["msg1Input"].disable();
  }

  /** Opens PayCode dialog and passes fktype and current PayCode to dialog component */
  openPayCodeDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fktype: this.fk.fktype,
      currentPayCode: this.fk.PC
    };

    const dialogRef = this._dialog.open(PayCodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.payCodeForm.controls["PCInput"].setValue(data[0]);
      }
    );
  }

  /** Submits pay code update to JantekService */
  onSubmit(): void {
    if (this.payCodeForm.valid) {
      this._jantekService.postPunch(this.payCodeForm.value);
    }
  }
}
