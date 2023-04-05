import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function customRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    const clearFiled = value.trim();

    return !clearFiled ? { required: true } : null;
  };
}
