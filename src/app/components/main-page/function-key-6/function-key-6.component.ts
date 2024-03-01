import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-6',
  templateUrl: './function-key-6.component.html',
  styleUrl: './function-key-6.component.css'
})
export class FunctionKey6Component implements OnInit{
  fk6: FunctionKey = {
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
    this.fk6 = this._jantekService.getFK6();
  }
}
