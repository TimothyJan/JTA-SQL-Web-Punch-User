import { Component, Input, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JantekService } from '../../../services/jantek.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CodeDialogComponent } from '../code-dialog/code-dialog.component';

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

  level1Label:string = "";
  level2Label:string = "";
  level3Label:string = "";

  fk: FunctionKey = {
    "fktype": 1,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };

  levelChangeForm = new FormGroup({
    msg1Input: new FormControl({value: "", disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$"),]),
    msg2Input: new FormControl({value: "", disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$"),]),
    msg3Input: new FormControl({value: "", disabled: true}, [Validators.required, Validators.pattern("^[0-9]*$"),]),
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
    if(this.fk["msg2"]) {
      this.enableMsg2();
    }
    if(this.fk["msg3"]) {
      this.enableMsg3();
    }
    this.level1Label = this._jantekService.getLevel1Label();
    this.level2Label = this._jantekService.getLevel2Label();
    this.level3Label = this._jantekService.getLevel3Label();
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

  /** Opens Code Dialog and passes fktype and current PayCode to dialog component.
   * After selection in dialog, selection is inputted to the formcontrol for msg1.
  */
  openCodeMsg1Dialog(): void {
    let levelChange:number = 0;
    // Determine level
    switch(this.fk.fktype) {
      case 4:
        levelChange = 3;
        break;
      case 5:
        levelChange = 1;
        break;
      case 6:
        levelChange = 2;
        break;
      case 7:
        levelChange = 3;
        break;
      case 8:
        levelChange = 1;
        break;
      case 9:
        levelChange = 1;
        break;
      case 10:
        levelChange = 2;
        break;
      case 11:
        levelChange = 1;
        break;
      default:
        levelChange = 0;
    }

    /** Dialog configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fktype: this.fk.fktype,
      currentCode: this.levelChangeForm.controls["msg1Input"].value,
      levelChange: levelChange
    };

    const dialogRef = this._dialog.open(CodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.levelChangeForm.controls["msg1Input"].setValue(data[0]);
      }
    );
  }

  /** Opens Code Dialog and passes fktype and current PayCode to dialog component.
   * After selection in dialog, selection is inputted to the formcontrol for msg2.
  */
  openCodeMsg2Dialog(): void {
    let levelChange:number = 0;
    // Determine level
    switch(this.fk.fktype) {
      case 8:
        levelChange = 2;
        break;
      case 9:
        levelChange = 3;
        break;
      case 10:
        levelChange = 3;
        break;
      case 11:
        levelChange = 2;
        break;
      default:
        levelChange = 0;
    }

    /** Dialog configuration */
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fktype: this.fk.fktype,
      currentCode: this.levelChangeForm.controls["msg2Input"].value,
      levelChange: levelChange
    };

    const dialogRef = this._dialog.open(CodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.levelChangeForm.controls["msg2Input"].setValue(data[0]);
      }
    );
  }

  /** Opens Code Dialog and passes fktype and current PayCode to dialog component.
   * After selection in dialog, selection is inputted to the formcontrol for msg3.
  */
  openCodeMsg3Dialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      fktype: this.fk.fktype,
      currentCode: this.levelChangeForm.controls["msg3Input"].value,
      levelChange: 3
    };

    const dialogRef = this._dialog.open(CodeDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.levelChangeForm.controls["msg3Input"].setValue(data[0]);
      }
    );
  }

  /** Checks if L1 code exists */
  async checkL1CodeExists(code:any): Promise<boolean>  {
    return new Promise<boolean>((resolve, reject) => {
      this._jantekService.checkL1CodeExists(+code).subscribe(
        data => {
          if (data["found"] > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
          console.error("Error checking L1 code existence:", error);
          reject(error);
        }
      );
    });
  }

  /** Checks if L2 code exists */
  async checkL2CodeExists(code:any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._jantekService.checkL2CodeExists(+code).subscribe(
        data => {
          if (data["found"] > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
          console.error("Error checking L2 code existence:", error);
          reject(error);
        }
      );
    });
  }

  /** Checks if L3 code exists */
  async checkL3CodeExists(code:any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._jantekService.checkL3CodeExists(+code).subscribe(
        data => {
          if (data["found"] > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
          console.error("Error checking L3 code existence:", error);
          reject(error);
        }
      );
    });
  }

  /** Checks if all level codes are valid to JantekService */
  async onSubmit(): Promise<void> {
    let allLevelCodesExist = false
    if (this.levelChangeForm.valid) {
      switch(this.fk.fktype) {
        case 4: { // Swipe-and-go w/ L3 change INCOMPLETE
          if (await this.checkL3CodeExists(this.levelChangeForm.controls.msg1Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 5: { // L1 change
          if (await this.checkL1CodeExists(this.levelChangeForm.controls.msg1Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 6: { // L2 change
          if (await this.checkL2CodeExists(this.levelChangeForm.controls.msg1Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 7: { // L3 change
          if (await this.checkL3CodeExists(this.levelChangeForm.controls.msg1Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 8: { // L1, L2 change
          if (await this.checkL1CodeExists(this.levelChangeForm.controls.msg1Input.value) && await this.checkL2CodeExists(this.levelChangeForm.controls.msg2Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 9: { // L1, L3 change
          if (await this.checkL1CodeExists(this.levelChangeForm.controls.msg1Input.value) && await this.checkL3CodeExists(this.levelChangeForm.controls.msg2Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 10: { // L2, L3 change
          if (await this.checkL2CodeExists(this.levelChangeForm.controls.msg1Input.value) && await this.checkL3CodeExists(this.levelChangeForm.controls.msg2Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        case 11: { // L1, L2, L3 change
          if (await this.checkL1CodeExists(this.levelChangeForm.controls.msg1Input.value) && await this.checkL2CodeExists(this.levelChangeForm.controls.msg2Input.value) && await this.checkL3CodeExists(this.levelChangeForm.controls.msg3Input.value)) {
            allLevelCodesExist = true;
          } else {
            allLevelCodesExist = false;
          }
          break;
        }
        default: {
          console.log("Error getting fktype");
        }
      }
    }
    if (allLevelCodesExist) {
      this.postPunch();
    } else {
      this._jantekService.invalidLevel();
    }
  }

  /** Submits level change update to JantekService */
  postPunch(): void {
    this._jantekService.postPunch(this.levelChangeForm.value);
  }
}
