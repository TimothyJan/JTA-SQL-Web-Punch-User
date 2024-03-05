import { Component, Input, OnInit } from '@angular/core';
import { FunctionKey } from '../../../models/function-key';
import { JantekService } from '../../../services/jantek.service';

@Component({
  selector: 'app-function-key',
  templateUrl: './function-key.component.html',
  styleUrl: './function-key.component.css'
})
export class FunctionKeyComponent implements OnInit{
  @Input() functionKeyNumber: number = 0;
  fktype: number = 0;

  constructor(
    private _jantekService: JantekService
  ) {}

  ngOnInit(): void {
    this.fktype = this._jantekService.getFunctionKeyInfo(this.functionKeyNumber).fktype;
  }

}
