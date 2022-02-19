export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegistrationResponseDto {
  isSuccessfulRegistration: boolean;
  errors: string[];
}
