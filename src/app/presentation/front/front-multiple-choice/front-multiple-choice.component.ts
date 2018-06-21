import { Component, OnInit, Input, Output, forwardRef, EventEmitter } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-front-multiple-choice',
  templateUrl: './front-multiple-choice.component.html',
  styleUrls: ['./front-multiple-choice.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FrontMultipleChoiceComponent),
      multi: true
    }
  ]
})
export class FrontMultipleChoiceComponent implements OnInit, ControlValueAccessor {
  @Input() question: any;
  @Output() goToSendForm = new EventEmitter<any>();
  private _value: any;
  otherValue: string;
  onChangeValue = (_) => {};
  onTouchedValue = () => {};


  constructor( ) { }

  ngOnInit() {
    this.question.response_options = this.question.response_options.sort((a, b) => a['poids'] - b['poids']);
  }

  change(event, option: any): void {
    this.value = [];
    if (option.slug === 'autres') {
      if (this.otherValue) {
        this.value.push({value_input: this.otherValue, is_texte: true});
      } else {
        this.value = null;
      }
    } else {
      this.value.push({value_input: event.value, is_texte: false});
    }
    this.onChangeValue(this.value);
    if (option.action.hasOwnProperty('has_rule_direction')) {
      this.goToSendForm.emit({
        has_rule_direction: option.action.has_rule_direction,
        rubrique_target_poids: option.action.rubrique_target_poids
      });
    }
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
