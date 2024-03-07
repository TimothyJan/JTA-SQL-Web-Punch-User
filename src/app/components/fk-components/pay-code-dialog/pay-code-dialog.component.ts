import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JantekService } from '../../../services/jantek.service';
import { CodeDesc } from '../../../models/code-desc';

@Component({
  selector: 'app-pay-code-dialog',
  templateUrl: './pay-code-dialog.component.html',
  styleUrl: './pay-code-dialog.component.css'
})
export class PayCodeDialogComponent implements OnInit{

  payCodeSelected: number = 0;
  payCodeList: CodeDesc[] = [new CodeDesc(0, "None")];
  payCodeNumList: number[] = [0];

  /** data injected gives "fktype" and "currentPayCode" currently selected */
  constructor(
    private _jantekService: JantekService,
    private _dialogRef: MatDialogRef<PayCodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this._dialogRef.updateSize('50%');

    // Load list of pay codes into payCodeList
    this._jantekService.getPayCodes(this.data.fktype).subscribe(
      data => {
        for(var index = 0; index<data["list"].length; index++) {
          // Push Paycode num and description
          let newPayCode = new CodeDesc(data["list"][index][0], data["list"][index][1]);
          this.payCodeList.push(newPayCode);

          // Push Paycode num list for easier selection in matlistoption
          this.payCodeNumList.push(data["list"][index][0]);
        }
      }
    );
  }

  /** Dialog selection */
  // onPayCodeDialogChange(event:any) {
  //   // console.log(event);
  // }

  /** Send selected pay code data to function-key */
  savePayCodeDialog(): void {
    this._dialogRef.close(this.payCodeSelected);
  }

  /** Close dialog and sends previous code input as selction */
  closePayCodeDialog(): void {
    this._dialogRef.close(this.data.currentPayCode);
  }
}
