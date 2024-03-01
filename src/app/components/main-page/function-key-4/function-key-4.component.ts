import { Component, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key-4',
  templateUrl: './function-key-4.component.html',
  styleUrl: './function-key-4.component.css'
})
export class FunctionKey4Component implements OnInit{
  fk4: FunctionKey = {
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
    this.fk4 = this._jantekService.getFK4();
  }

}
