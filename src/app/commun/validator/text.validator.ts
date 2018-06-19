import { AbstractControl } from '@angular/forms';

export class TextValidator {

  static include(text: string) {
    return (control: AbstractControl) => {
      if (control.value && control.value.toString().indexOf(text) < 0) {
        return {includeTextError: true};
      }
    };
  }

  static exclude(text: string) {
    return (control: AbstractControl) => {
      if (control.value && control.value.toString().indexOf(text) > -1) {
        return {excludeTextError: true};
      }
    };
  }
}
