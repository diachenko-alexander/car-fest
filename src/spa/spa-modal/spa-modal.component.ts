import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'spa-modal',
  templateUrl: './spa-modal.component.html',
  styleUrls: ['./spa-modal.component.css']
})
export class SpaModalComponent implements OnInit {

  constructor(public modalRef: MdbModalRef<SpaModalComponent>) {}

  ngOnInit(): void {
  }

}
