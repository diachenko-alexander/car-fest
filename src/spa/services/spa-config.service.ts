import {Injectable} from '@angular/core';

export  interface Icons {
  imageFile: string;
  url: string;
  alt: string;
}

export interface SpaConfigSettings {
  showUserControls?: boolean;
  socialIcons?: Array<Icons>;
}

@Injectable()
export class SpaConfigService {
  showUserControls = true;
  socialIcons = new Array<Icons>();

  configure(settings: SpaConfigSettings): void {
    Object.assign(this, settings);
  }
}
