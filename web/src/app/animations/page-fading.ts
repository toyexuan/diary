import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

export const pageFading = trigger('pageFading', [
  transition('void => *', [
    style({ opacity: 0, transform: 'scale(1.1)' }),
    animate(1500, style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition('* => void', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate(1500, style({ opacity: 0, transform: 'scale(1.1)' }))
  ])
]);
