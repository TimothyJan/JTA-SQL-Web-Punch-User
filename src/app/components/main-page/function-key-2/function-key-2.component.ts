import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-2',
  templateUrl: './function-key-2.component.html',
  styleUrl: './function-key-2.component.css'
})
export class FunctionKey2Component implements OnInit{
  fk2: FunctionKey = {
    "fktype": 1,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this.fk2 = this._jantekService.getFK2();
  }
}
