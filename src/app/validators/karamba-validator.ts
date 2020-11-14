import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export class KarambaValidator {

  // whitespace validation
  static notOnlyWhitespace(control: FormControl): ValidationErrors {
    // check if string contains only whitespace
    if ((control.value != null) && (control.value.trim().length === 0)) {
      // invalid, return error object
      return {notOnlyWhitespace: true};
    } else {
      return null;
    }
  }
}
