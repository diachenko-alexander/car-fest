import {Component, Input, OnInit} from '@angular/core';
import {SpaConfigService} from '../services/spa-config.service';
import {UserApi} from '../users/user-api';

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
  constructor(public spaConfigService: SpaConfigService, public userApi: UserApi) {
  }


  ngOnInit(): void {
    this.showLoader = false;
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  }

  signOut(): void {
    this.showLoader = true;
    setTimeout(() => {
      this.userApi.signOut();
    }, 2000);
    console.log('Sign out');
  }

}
