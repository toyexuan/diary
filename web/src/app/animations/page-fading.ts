import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';

export const pageFading = trigger('fadeIn', [
  transition('void => *', [
    style({ opacity: 0, transfrom: 'scale(1.1)' }),
    animate(3000, style({ opacity: 1, transfrom: 'scale(1)' }))
  ]),
  transition('* => void', [
    style({ opacity: 1, transfrom: 'scale(1)' }),
    animate(3000, style({ opacity: 0, transfrom: 'scale(1.1)' }))
  ])
]);
