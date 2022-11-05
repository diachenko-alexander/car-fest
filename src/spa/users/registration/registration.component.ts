import {Component, OnInit} from '@angular/core';
import {visibility} from '../../services/animations';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import {UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';
import {User} from '../../services/user.interface';
import {
  lowerCaseLetterValidator,
  upperCaseLetterValidator,
  nonAlphanumericCharacterValidator,
  checkPasswords
} from '../../validators/validators';
import {validationMessages} from '../../validators/validationMessages';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [visibility]
})
export class RegistrationComponent implements OnInit {
  registrationForm: UntypedFormGroup;
  user: User = new User();
  registering = false;

  formErrors = {
    firstName: [] as string[],
    lastName: [] as string[],
    email: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],

  };

  constructor(private router: Router, private userService: UserService, private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      firstName: [this.user.firstName, [
        Validators.required,
      ]],
      lastName: [this.user.lastName, [
        Validators.required,
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}'),
      ]],
      password: [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        lowerCaseLetterValidator,
        upperCaseLetterValidator,
        nonAlphanumericCharacterValidator,
      ]],
      confirmPassword: [this.user.confirmPassword, [
        Validators.required,
      ]]
    }, {validators: checkPasswords('password', 'confirmPassword')});

    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChange(data));

  }

  onValueChange(data: any): void {
    if (!this.registrationForm) {
      return;
    }
    let form = this.registrationForm;

    // eslint-disable-next-line guard-for-in
    for (let field in this.formErrors) {
      // @ts-ignore
      this.formErrors[field] = [] as string[];
      let control = form.get(field);

      if (control && control.dirty) {
        if (!control.valid) {
          // @ts-ignore
          let message = validationMessages[field];
          for (let key in control.errors) {
            // @ts-ignore
            this.formErrors[field].push(message[key]);
          }
        }
      }
    }
  }

  onSubmit(registerForm: UntypedFormGroup): void {
    if (registerForm.valid) {
      this.registering = true;
      this.userService.registerUser(registerForm.value).subscribe(() => {
        this.router.navigate(['/sign-in']);
      }, error => {
        console.log(error);
      });
    }
  }

  onCancel (): void {
    this.router.navigate(['/sign-in']);
  }

}
