import { Component, OnInit, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit, OnChanges {
  @Input() name: string;
  @Input() userBg: string;
  @Input() userColor: string;
  
  private _name: string = '';
  firstChar: string;

  @Output() notify = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this._name = this.name;
    this.firstChar = this._name[0];
  }

  ngOnChanges(changes: SimpleChanges) {
    let name = changes.name;
    this._name = name.currentValue;
    this.firstChar = this._name[0];
  }

  nameClicked() {
    this.notify.emit(this._name);
  }

}
