import { Component } from '@angular/core';
import {SpaConfigService, SpaConfigSettings} from '../spa/services/spa-config.service';
import {MenuService} from '../spa/services/menu.service';
import {AppMenuItems} from './app.menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public spaConfigService: SpaConfigService, public menuService: MenuService) {
    const config: SpaConfigSettings = {
      socialIcons: [
      {imageFile: '../../assets/imgs/facebook.png', alt: 'Facebook', url: 'http://facebook.com'},
      {imageFile: '../../assets/imgs/instagram.png', alt: 'Instagram', url: 'http://www.instagram.com'},
      {imageFile: '../../assets/imgs/twitter.png', alt: 'Twitter', url: 'http://twitter.com'},
      {imageFile: '../../assets/imgs/whatsapp.png', alt: 'Whatsapp', url: 'http://www.whatsapp.com'},
    ],
      showUserControls: true
    };
    spaConfigService.configure(config);
    menuService.items = AppMenuItems;
  }
}
