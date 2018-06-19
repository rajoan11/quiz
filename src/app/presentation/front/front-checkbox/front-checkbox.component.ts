import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-checkbox',
  templateUrl: './front-checkbox.component.html',
  styleUrls: ['./front-checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontCheckboxComponent),
      multi: true
    }
  ]
})
export class FrontCheckboxComponent implements OnInit {
  @Input() question;
  private _value: any;
  otherValue: string;
  otherOptionIsChecked = false;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};

  constructor() {
  }

  ngOnInit() {
  }

  change(event: MatCheckboxChange, slug: string): void {
    if (event instanceof MatCheckboxChange) {
      if (event.checked) {
        if (slug === 'autres') {
          this.otherOptionIsChecked = true;
          if (this.otherValue) {
            this.value.push({value_input: this.otherValue, is_texte: true});
          }
        } else {
          this.value.push({value_input: slug, is_texte: false});
        }
      } else {
        if (slug === 'autres') {
          this.otherOptionIsChecked = false;
        }
        const index = this._value.findIndex(item => (slug === 'autres' ? item['is_texte'] : item['value_input'] === slug));
        if (index > -1) {
          this.value.splice(index, 1);
        }
      }
    }
    this.onChangeValue(this.value);
  }

  changeTextInput(): void {
    if (this.otherValue && this.otherOptionIsChecked) {
      this.value.push({value_input: this.otherValue, is_texte: true});
    } else if (!this.otherValue && this.otherOptionIsChecked) {
      const index = this._value.findIndex(item => item['is_texte']);
      if (index > -1) {
        this.value.splice(index, 1);
      }
    }
    this.onChangeValue(this.value);
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
