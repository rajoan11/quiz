import { Component, OnInit, Input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-multiple-choice',
  templateUrl: './front-multiple-choice.component.html',
  styleUrls: ['./front-multiple-choice.component.css']
})
export class FrontMultipleChoiceComponent implements OnInit, ControlValueAccessor {
  @Input() question = {};
  private _value: any;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};

  constructor( ) {
    this.question['answer'] = null;
  }

  ngOnInit() {
  }

  change(event): void {
    console.log(event);
  }

  setDisabledState?(isDisabled: boolean): void { }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChangeValue(val);
  }

  writeValue(value: any): void {
    this._value = value;
    this.onChangeValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChangeValue = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedValue = fn;
  }

}
