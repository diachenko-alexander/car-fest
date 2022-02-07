import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../services/menu.service';

@Component({
  selector: 'spa-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
