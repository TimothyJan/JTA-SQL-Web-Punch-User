import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-3',
  templateUrl: './function-key-3.component.html',
  styleUrl: './function-key-3.component.css'
})
export class FunctionKey3Component  implements OnInit{
  fk3: FunctionKey = {
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
    this.fk3 = this._jantekService.getFK3();
  }
}
