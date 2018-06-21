import { AbstractControl } from '@angular/forms';

export class RegexValidator {

  static match(pattern: any) {
    return (control: AbstractControl) => {
      if (control.value && control.value !== '' && !control.value.toString().match(pattern)) {
        return {matchError: true};
      }
    };
  }

  static notMatch(pattern: any) {
    return (control: AbstractControl) => {
      if (control.value && control.value !== '' && !control.value.toString().match(`^((?!${pattern}).)*$`)) {
        return {notMatchError: true};
      }
    };
  }
}
