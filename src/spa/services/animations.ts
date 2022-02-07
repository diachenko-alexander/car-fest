import {trigger, transition, style, animate} from '@angular/animations';
export const visibility = trigger('visibility',
  [transition(':enter', [style({
    opacity: 0
  }), animate(800, style({
    opacity: 1
  }))
  ])]);
export const visibilityPopup = trigger('visibilityPopup',
  [transition(':enter',
    [style({opacity: 0}),
      animate(400, style({opacity: 1}))]),
    transition(':leave',
      [animate(200, style({opacity: 0}))])
  ]);
