import {Injectable} from '@angular/core';

export interface MenuItem {
  text: string;
  icon: string;
  route?: string;
  submenu?: Array<MenuItem>;
}

@Injectable()
export class MenuService {
  // @ts-ignore
  items: Array<MenuItem>;
  isVertical = false;
  showVerticalMenu = false;
  toggleMenu(): void {
    this.isVertical = true;
    this.showVerticalMenu = !this.showVerticalMenu;
  }
  toggleOrientation(): void {
    this.isVertical = !this.isVertical;
  }
}
