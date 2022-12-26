export const validationMessages = {
  firstName: {
    required: 'Required field.',
  },
  lastName: {
    required: 'Required field.',
  },
  email: {
    required: 'Required field.',
    pattern: 'Incorect email format.',
  },
  password: {
    required: 'Required field.',
    minlength: 'Passwords must be at least 6 characters.',
    lowerCaseLetterValidator: 'Passwords must have at least one lowercase letter',
    upperCaseLetterValidator: 'Passwords must have at least one uppercase letter',
    nonAlphanumericCharacterValidator: 'Passwords must have at least one non alphanumeric character.',

  },
  confirmPassword: {
    required: 'Required field.',
    checkPasswords: 'Passwords must be same',
  },

  oldPassword: {
    required: 'Required field.'
  }
};
