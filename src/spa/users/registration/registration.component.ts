import { Component, OnInit } from '@angular/core';
import {visibility} from '../../services/animations';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {User} from '../../services/user.interface';
import {lowerCaseLetterValidator, upperCaseLetterValidator,nonAlphanumericCharacterValidator} from '../../validators/validators';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [visibility]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  user: User = new User();

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'confirmPassword': '',

  };

  validatioMessages = {
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
    }
  };

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

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
    });
    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChange(data));

   }

   onValueChange(data: any): void {
    if (!this.registrationForm) {
      return;
    }
    let form = this.registrationForm;

     // tslint:disable-next-line:forin
    for (let field in this.formErrors){
      // @ts-ignore
      this.formErrors[field] = '';
      let control = form.get(field);

      if (control && control.dirty && !control.valid){
        // @ts-ignore
        let message = this.validatioMessages[field];
        for (let key in control.errors) {
          // @ts-ignore
          this.formErrors[field] += message[key] + ' ';
        }
      }
    }
   }

   onSubmit(registerForm: FormGroup): void {
    this.userService.registerUser(registerForm.value).subscribe(() => {
      this.router.navigate(['/sign-in']);
    }, error => {
      console.log(error.errors);
    })
   }


   //OLD
  // registering = false;
  // hasAdded = false;
  // constructor(private router: Router, private userService: UserService) { }
  //
  // ngOnInit(): void {
  // }
  // onSubmit(registerForm: NgForm): void {
  //   this.registering = true;
  //   this.userService.registerUser(registerForm.value).subscribe(() => {
  //     this.hasAdded = true;
  //     this.router.navigate(['/sign-in']);
  //   }, error => {
  //     console.log(error.error.errors);
  //   });
  // }

}
