import {Component, Input, OnInit} from '@angular/core';
import {MenuService, MenuItem} from '../../services/menu.service';


@Component({
  selector: 'spa-popup-menu',
  templateUrl: './popup-menu.component.html',
  styleUrls: ['./popup-menu.component.css']
})
export class PopupMenuComponent implements OnInit {

  @Input() menu?: Array<MenuItem>;
  constructor(public menuService: MenuService) { }

  ngOnInit(): void {
  }

}
