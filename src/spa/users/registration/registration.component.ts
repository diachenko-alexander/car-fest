import {Component, OnInit} from '@angular/core';
import {visibility} from '../../services/animations';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
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
  registrationForm: FormGroup;
  user: User = new User();
  registering = false;

  formErrors = {
    firstName: [] as string[],
    lastName: [] as string[],
    email: [] as string[],
    password: [] as string[],
    confirmPassword: [] as string[],

  };

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) {
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

    // tslint:disable-next-line:forin
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

  onSubmit(registerForm: FormGroup): void {
    if (registerForm.valid) {
      this.registering = true;
      this.userService.registerUser(registerForm.value).subscribe(() => {
        this.router.navigate(['/sign-in']);
      }, error => {
        console.log(error);
      });
    }
  }


}
