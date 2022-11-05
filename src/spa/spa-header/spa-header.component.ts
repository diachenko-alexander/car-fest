import { Component, OnInit } from '@angular/core';
import {ScreenService} from '../services/screen.service';
import {MenuService} from '../services/menu.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'spa-header',
  templateUrl: './spa-header.component.html',
  styleUrls: ['./spa-header.component.css']
})
export class SpaHeaderComponent implements OnInit {
  flagForIcons = true;
  constructor(public screenService: ScreenService, public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
