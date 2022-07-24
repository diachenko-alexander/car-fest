export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string;
  userFirstName: string;
  token: string;
}
