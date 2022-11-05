import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../spa/interfaces/UserInfoResponseDto.interface';
import {AppDataService} from '../../services/app-data.service';
import {SpaModalComponent} from '../../../spa/spa-modal/spa-modal.component';
import {MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userInfo: UserInfo = <UserInfo>{};
  modalRef: MdbModalRef<SpaModalComponent> | null = null;


  constructor(private appDataService: AppDataService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    this.appDataService.getUserInfo().subscribe((userInfo: UserInfo) => {
     this.userInfo = userInfo;
    });
  }

  openModal() {
    this.modalRef = this.modalService.open(SpaModalComponent, {
      modalClass: 'modal-xl'
    })
  }

  changeUserPassword(): void {

  }

}
