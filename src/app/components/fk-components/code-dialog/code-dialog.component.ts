import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CodeDesc } from '../../../models/code-desc';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-code-dialog',
  templateUrl: './code-dialog.component.html',
  styleUrl: './code-dialog.component.css'
})
export class CodeDialogComponent implements OnInit {

  codeSelected: number = 0;
  codeList: CodeDesc[] = [new CodeDesc(0, "None")];
  codeNumList: number[] = [0];

  /** data injected gives "fktype" and "currentPayCode" currently selected */
  constructor(
    private _jantekService: JantekService,
    private _dialogRef: MatDialogRef<CodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this._dialogRef.updateSize('50%');

    // Level Selection
    switch(this.data["levelChange"]) {
      case 1:
        this.loadLevel1Codes();
        break;
      case 2:
        this.loadLevel2Codes();
        break;
      case 3:
        this.loadLevel3Codes();
        break;
      default:
        break;
    }
  }

  /** Load Level 1 codes into codeList and codeNumList */
  loadLevel1Codes(): void {
    this._jantekService.getLevel1Codes().subscribe(
      data => {
        for(var index = 0; index<data["list"].length; index++) {
          // Push code numbers and description
          let newCode = new CodeDesc(data["list"][index][0], data["list"][index][1]);
          this.codeList.push(newCode);

          // Push Paycode num list for easier selection in matlistoption
          this.codeNumList.push(data["list"][index][0]);
        }
      }
    );
  }

  /** Load Level 2 codes into codeList and codeNumList */
  loadLevel2Codes(): void {
    this._jantekService.getLevel2Codes().subscribe(
      data => {
        for(var index = 0; index<data["list"].length; index++) {
          // Push code numbers and description
          let newCode = new CodeDesc(data["list"][index][0], data["list"][index][1]);
          this.codeList.push(newCode);

          // Push Paycode num list for easier selection in matlistoption
          this.codeNumList.push(data["list"][index][0]);
        }
      }
    );
  }

  /** Load Level 3 codes into codeList and codeNumList */
  loadLevel3Codes(): void {
    this._jantekService.getLevel3Codes().subscribe(
      data => {
        for(var index = 0; index<data["list"].length; index++) {
          // Push code numbers and description
          let newCode = new CodeDesc(data["list"][index][0], data["list"][index][1]);
          this.codeList.push(newCode);

          // Push Paycode num list for easier selection in matlistoption
          this.codeNumList.push(data["list"][index][0]);
        }
      }
    );
  }

  /** Send selected pay code data to function-key */
  savePayCodeDialog(): void {
    this._dialogRef.close(this.codeSelected);
  }

  /** Close dialog and sends previous code input as selction */
  closePayCodeDialog(): void {
    if (this.data.currentCode) {
      this._dialogRef.close(this.data.currentCode);
    }
    else {
      this._dialogRef.close(0);
    }
  }
}
