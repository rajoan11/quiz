import { AbstractControl } from '@angular/forms';

export class NumberValidator {

  static equal(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {equalNumberError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value !== constraint) {
          return {equalNumberError: true};
        }
      }
    };
  }

  static notEqual(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {equalNumberError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value === constraint) {
          return {notEqualNumberError: true};
        }
      }
    };
  }

  static between(min: number, max: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {equalNumberError: true};
      } else {
        if (control.value && !isNaN(control.value) && (+control.value > max || +control.value < min)) {
          return {numberBetweenError: true};
        }
      }
    };
  }

  static integer(control: AbstractControl) {
    if (control.value && isNaN(control.value)) {
      return {equalNumberError: true};
    } else {
      if (control.value && !isNaN(control.value) && (parseInt(control.value, 10) !== parseFloat(control.value))) {
        return {integerError: true};
      }
    }
  }
}
