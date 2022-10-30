import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../spa/interfaces/UserInfoResponseDto.interface';
import {UserService} from '../../services/user.service';
import {AppDataService} from '../../services/app-data.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfo = <UserInfo>{};
  showChangePasswordModalBox = false;


  constructor(private appDataService: AppDataService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.appDataService.getUserInfo().subscribe((userInfo: UserInfo) => {
     this.userInfo = userInfo;
    });
  }

  changeUserPassword(): void {

  }

}
