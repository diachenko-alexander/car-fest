import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {group} from '@angular/animations';

export function lowerCaseLetterValidator (control: AbstractControl): {[key: string]: any} {
  let regex = /[a-z]/;
  let value = control.value;

  let result = regex.test(value);

  if (result){
    return null;
  } else {
    return {'lowerCaseLetterValidator': {value}}
  }
}

export function upperCaseLetterValidator (control: AbstractControl): {[key: string]: any} {
  let regex = /[A-Z]/;
  let value = control.value;

  let result = regex.test(value);

  if (result){
    return null;
  } else {
    return {'upperCaseLetterValidator': {value}}
  }
}

export function nonAlphanumericCharacterValidator (control: AbstractControl): {[key: string]: any} {
  let regex = /[^a-zA-Z\d\s:]/;
  let value = control.value;

  let result = regex.test(value);

  if (result){
    return null;
  } else {
    return {'nonAlphanumericCharacterValidator': {value}}
  }
}

export function checkPasswords(controlName: string, matchingControlName: string) {
  return (formGroup: AbstractControl): ValidationErrors | null  => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ checkPasswords: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
