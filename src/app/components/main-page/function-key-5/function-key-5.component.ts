import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-5',
  templateUrl: './function-key-5.component.html',
  styleUrl: './function-key-5.component.css'
})
export class FunctionKey5Component  implements OnInit{
  fk5: FunctionKey = {
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
    this.fk5 = this._jantekService.getFK5();
  }
}
