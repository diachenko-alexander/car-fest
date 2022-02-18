import {AbstractControl, ValidatorFn} from '@angular/forms';

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
