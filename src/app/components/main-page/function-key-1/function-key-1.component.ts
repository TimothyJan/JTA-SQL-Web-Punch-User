import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-1',
  templateUrl: './function-key-1.component.html',
  styleUrl: './function-key-1.component.css'
})
export class FunctionKey1Component implements OnInit{
  fk1: FunctionKey = {
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
    this.fk1 = this._jantekService.getFK1();
    console.log(this._jantekService.punchConfiguration);

  }
}
