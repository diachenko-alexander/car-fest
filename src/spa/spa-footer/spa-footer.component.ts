import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spa-footer',
  templateUrl: './spa-footer.component.html',
  styleUrls: ['./spa-footer.component.css']
})
export class SpaFooterComponent implements OnInit {
  title = 'All rights reserved';
  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
