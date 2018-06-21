import { AbstractControl } from '@angular/forms';

export class NumberValidator {

  static min(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {minError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value <= constraint) {
          return {minError: true};
        }
      }
    };
  }

  static minOrEqual(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {minOrEqualError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value < constraint) {
          return {minOrEqualError: true};
        }
      }
    };
  }

  static max(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {maxError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value >= constraint) {
          return {maxError: true};
        }
      }
    };
  }

  static maxOrEqual(constraint: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {maxOrEqualError: true};
      } else {
        if (control.value && !isNaN(control.value) && +control.value > constraint) {
          return {maxOrEqualError: true};
        }
      }
    };
  }

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
        return {notEqualNumberError: true};
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
        return {numberBetweenError: true};
      } else {
        if (control.value && !isNaN(control.value) && (+control.value > max || +control.value < min)) {
          return {numberBetweenError: true};
        }
      }
    };
  }

  static notBetween(min: number, max: number) {
    return (control: AbstractControl) => {
      if (control.value && isNaN(control.value)) {
        return {numberNotBetweenError: true};
      } else {
        if (control.value && !isNaN(control.value) && (+control.value < max && +control.value > min)) {
          return {numberNotBetweenError: true};
        }
      }
    };
  }

  static integer(control: AbstractControl) {
    if (control.value && isNaN(control.value)) {
      return {integerError: true};
    } else {
      if (control.value && !isNaN(control.value) && (parseInt(control.value, 10) !== parseFloat(control.value))) {
        return {integerError: true};
      }
    }
  }
}
