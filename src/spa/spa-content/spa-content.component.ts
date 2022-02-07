import { Component, OnInit } from '@angular/core';
import {ScreenService} from '../services/screen.service';
import {MenuService} from '../services/menu.service';

@Component({
  selector: 'spa-content',
  templateUrl: './spa-content.component.html',
  styleUrls: ['./spa-content.component.css']
})
export class SpaContentComponent implements OnInit {

  constructor(public screenService: ScreenService, public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
