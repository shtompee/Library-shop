import { AbstractControl, ValidatorFn } from '@angular/forms';

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

export function customValidatorName(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  // Реализуйте свою логику валидации
  if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(value)) {
    return { customValidation: true };
  }

  return null;
}

export function customValidationYear(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  // Реализуйте свою логику валидации
  if (value < 2023 || value > currentYear) {
    return { customValidation: true };
  }

  return null;
}

export function customValidationImage(
  control: AbstractControl
): { [key: string]: any } | null {
  const value = control.value;
  // Реализуйте свою логику валидации
  if (value.files.length === 0) {
    return { customValidation: true };
  }

  return null;
}
