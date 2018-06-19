import { Component, OnInit, Input, forwardRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-list-scroll',
  templateUrl: './front-list-scroll.component.html',
  styleUrls: ['./front-list-scroll.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontListScrollComponent),
      multi: true
    }
  ]
})
export class FrontListScrollComponent implements OnInit {
  @Input() question: any;
  private _value: any;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};

  constructor() { }

  ngOnInit() {
  }

  change(event): void {
    this.onChangeValue(event.value);
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
