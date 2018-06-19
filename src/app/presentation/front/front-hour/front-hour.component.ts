import { Component, OnInit, forwardRef, Input } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-hour',
  templateUrl: './front-hour.component.html',
  styleUrls: ['./front-hour.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontHourComponent),
      multi: true
    }
  ]
})
export class FrontHourComponent implements OnInit {
  @Input() question: any;
  private _value: any;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};

  constructor() { }

  ngOnInit() {
  }

  change(event): void {
    this.onChangeValue(event.target.value);
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
