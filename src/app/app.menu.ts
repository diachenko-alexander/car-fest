import {MenuItem} from '../spa/services/menu.service';

export const AppMenuItems: Array<MenuItem> = [
  {
    text: 'Cars', icon: '../../assets/imgs/car.png', route: '/cars',
    submenu: [
      {
        text: 'Select', icon: '../../assets/imgs/car.png', route: undefined, submenu: [
          {text: 'Ferrary', icon: '../../assets/imgs/car.png', route: '/authenticated/car-detail/Ferrary', submenu: undefined},
          {text: 'Buggati', icon: '../../assets/imgs/car.png', route: '/authenticated/car-detail/Buggati', submenu: undefined},
          {text: 'Lamborghini', icon: '../../assets/imgs/car.png', route: '/authenticated/car-detail/Lamborghini', submenu: undefined},
          {text: 'Mazerrati', icon: '../../assets/imgs/car.png', route: '/authenticated/car-detail/Mazerrati', submenu: undefined}]
      },
      {text: 'Price top', icon: '../../assets/imgs/car.png', route: '/authenticated/car-list/1', submenu: undefined},
      {text: 'Top 3', icon: '../../assets/imgs/car.png', route: '/authenticated/car-list/3', submenu: undefined},
      {text: 'Top 5', icon: '../../assets/imgs/car.png', route: '/authenticated/car-list/5', submenu: undefined}]
  },
  {
    text: 'Maintenance', icon: '../../assets/imgs/settings.png', route: undefined, submenu:
      [
        {text: 'Car maint', icon: '../../assets/imgs/settings.png', route: '/authenticated/car-maint', submenu: undefined},
        {text: 'Settings', icon: '../../assets/imgs/settings.png', route: '/authenticated/settings', submenu: undefined}
      ]
  },
  {text: 'Home', icon: '../../assets/imgs/home.png', route: '/authenticated/home', submenu: undefined},
];
