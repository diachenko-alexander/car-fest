import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class ScreenService {
  private resizeSource = new Subject<null>();
  resize$ = this.resizeSource.asObservable();
  largePixels = 780;
  screenWiwth: number | undefined;
  screeHeight: number | undefined;
  constructor() {
    try {
      this.screenWiwth = window.innerWidth;
      this.screeHeight = window.innerHeight;
      window.addEventListener('resize', (event) => this.onResize(event));
    } catch (e) {
      console.log(e);
    }
  }
  onResize(event: Event): void {
    this.screenWiwth = window.innerWidth;
    this.screeHeight = window.innerHeight;
    this.resizeSource.next();
  }
  isLarge(): boolean {
    // @ts-ignore
    return this.screenWiwth >= this.largePixels;
  }
}
