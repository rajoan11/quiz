import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-front-linear-scal',
  templateUrl: './front-linear-scal.component.html',
  styleUrls: ['./front-linear-scal.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontLinearScalComponent),
      multi: true
    }
  ]
})
export class FrontLinearScalComponent implements OnInit {
  @Input() question: any;
  private _value: any;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};

  constructor() { }

  ngOnInit() {}

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

  change(event): void {
    this.onChangeValue(event.value);
  }
}
