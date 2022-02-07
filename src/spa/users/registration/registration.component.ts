import { Component, OnInit } from '@angular/core';
import {visibility} from '../../services/animations';
import {UserService} from '../../../app/services/user.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'spa-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [visibility]
})
export class RegistrationComponent implements OnInit {
  registering = false;
  hasAdded = false;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  onSubmit(registerForm: NgForm): void {
    this.registering = true;
    this.userService.registerUser(registerForm.value).subscribe(() => {
      setTimeout(() => {this.hasAdded = true; }, 1200);
      setTimeout(() => {this.router.navigate(['/sign-in']); }, 2000);
    });
  }

}
