import { Component, Input, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';

@Component({
  selector: 'app-function-key',
  templateUrl: './function-key.component.html',
  styleUrl: './function-key.component.css'
})
export class FunctionKeyComponent implements OnInit{
  @Input() functionKeyNumber: number = 0;
  @Input() fk:FunctionKey = {
    "fktype": 1,
    "caption": "",
    "msg1": "",
    "msg2": "",
    "msg3": "",
    "PC": 0
  };
  fktype: number = 0;

  ngOnInit(): void {
    this.fktype = this.fk["fktype"];
  }

}
