import {Component, OnInit} from '@angular/core';
import {UserApi} from '../user-api';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {visibility} from '../../services/animations';
import {User} from '../../services/user.interface';
import {validationMessages} from '../../validators/validationMessages';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [visibility]
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  user: User = new User();
  submitting = false;
  // @ts-ignore
  data: any;
  formErrors = {
    email: [] as string [],
    password: [] as string [],
    loginError: '',
  };

  constructor(public userApi: UserApi, public userService: UserService, public router: Router, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: [this.user.email, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}'),
      ]],
      password: [this.user.password, [Validators.required]],
    });

    this.loginForm.valueChanges
      .subscribe(data => this.onValueChange(data));
  }

  onValueChange(data: any): void {
    if (!this.loginForm) {
      return;
    }
    let form = this.loginForm;

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

  onSubmit(signInForm: FormGroup): void {
    if (signInForm.valid) {
      this.submitting = true;
      // @ts-ignore
      // this.formError = null;
      this.userApi.signIn(signInForm.value.email, signInForm.value.password).subscribe(() => {
          this.router.navigate(['/authenticated/home']);
        },
        (error) => {
          this.submitting = false;
          this.formErrors.loginError = 'Invalid user name or password';
          console.error(error);
          // this.formError = error.error.errorMessage;
        });
    }
  }


}
