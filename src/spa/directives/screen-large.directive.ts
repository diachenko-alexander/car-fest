import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ScreenService} from '../services/screen.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[screenLarge]'
})
export class ScreenLargeDirective implements OnInit {
  private hasView = false;
  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(private template: TemplateRef<Object>,
              private screenService: ScreenService,
              private viewContainer: ViewContainerRef) {
    screenService.resize$.subscribe(() => {
      this.onResize();
    });
  }
  onResize(): void {
    this.screenLarge = false;
  }
  ngOnInit(): void {
    this.onResize();
  }

  @Input()
  set screenLarge(condition: boolean) {
    // @ts-ignore
    condition = this.screenService.screenWiwth >= this.screenService.largePixels;
    if (condition && !this.hasView) {
      this.hasView = true;
      this.viewContainer.createEmbeddedView(this.template);
    } else if (!condition && this.hasView) {
      this.hasView = false;
      this.viewContainer.clear();
    }
  }
}
