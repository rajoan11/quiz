import { Component, OnInit, Input, forwardRef, Injector } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'app-front-short-answer',
  templateUrl: './front-short-answer.component.html',
  styleUrls: ['./front-short-answer.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontShortAnswerComponent),
      multi: true
    }
  ]
})
export class FrontShortAnswerComponent implements OnInit, ControlValueAccessor {
  @Input() question: any;
  @Input() errorMessage: string;
  private _value: any;
  isValid = true;
  ngControl: NgControl;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};


  constructor(
    private injector: Injector
    ) { }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl);
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

  change(event): void {
    this.onChangeValue(event.target.value);
    this.isValid = this.ngControl.control.valid;
  }

}
