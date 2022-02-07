import {Component, OnInit} from '@angular/core';
import {UserApi} from '../user-api';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {visibility} from '../../services/animations';
import {User} from '../../services/user.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'spa-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  animations: [visibility]
})
export class SignInComponent implements OnInit {
  submitting = false;
  // @ts-ignore
  formError: string;
  data: any;

  constructor(public userApi: UserApi, public userService: UserService, public router: Router) {
  }

  onSubmit(signInForm: NgForm): void {
    if (signInForm.valid) {
      this.submitting = true;
      // @ts-ignore
      this.formError = null;
      this.userApi.signIn(signInForm.value.email, signInForm.value.password).subscribe(() => {
          this.router.navigate(['/authenticated']);
        },
        (error) => {
          this.submitting = false;
          this.formError = error;
        });
    }
  }

  ngOnInit(): void {
  }


}
