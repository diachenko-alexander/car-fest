import {Component, Input, OnInit} from '@angular/core';
import {SpaConfigService} from '../services/spa-config.service';
import {UserApi} from '../users/user-api';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'icon-bar',
  templateUrl: './icon-bar.component.html',
  styleUrls: ['./icon-bar.component.css']
})
export class IconBarComponent implements OnInit {
  showLoader: boolean | undefined;
  @Input() showIcons: boolean | undefined;
  userInfo: string;
  constructor(public spaConfigService: SpaConfigService, public userApi: UserApi, public router: Router) {
  }


  ngOnInit(): void {
    this.showLoader = false;
    this.userInfo = localStorage.getItem('user');
  }

  signOut(): void {
    this.showLoader = true;
    setTimeout(() => {
      this.userApi.signOut();
    });
    console.log('Sign out');
  }

  userInfoButton(): void {
    this.router.navigate(['/authenticated/user-info']);
  }

}
