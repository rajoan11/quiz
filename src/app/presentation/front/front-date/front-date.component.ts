import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-date',
  templateUrl: './front-date.component.html',
  styleUrls: ['./front-date.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontDateComponent),
      multi: true
    }
  ]
})
export class FrontDateComponent implements OnInit {
  @Input() question: any;
  private _value: any;
  onChangeValue = _ => {};
  onTouchedValue = () => {};

  constructor() {}

  ngOnInit() {}

  addEvent(event): void {
    console.log(event.target.value);
    this.onChangeValue(event.target.value);
  }

  setDisabledState?(isDisabled: boolean): void {}

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
