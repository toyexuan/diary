import {
  Component,
  AfterContentInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { delayFor } from 'src/app/lib/sleep';

type ScrollerFontVariant = 'small' | 'medium' | 'large' | 'extra';

@Component({
  selector: 'app-scroller',
  templateUrl: './scroller.component.html',
  styleUrls: ['./scroller.component.scss']
})
export class ScrollerComponent implements AfterContentInit {
  @Input() content: string[];
  @Input() fadingTime: number;
  @Input() maxHeight: number;
  @Input() variant: ScrollerFontVariant[];
  @ViewChild('scroller') scoller: ElementRef<HTMLDivElement>;

  constructor(private renderer: Renderer2) {}

  async ngAfterContentInit() {
    if (!this.content) {
      return;
    }

    for (let i = 0; i < this.content.length; i++) {
      if (this.maxHeight && this.maxHeight <= i) {
        const index = i - this.maxHeight;
        const topLine = this.scoller.nativeElement.children[index] as HTMLSpanElement;
        topLine.style.height = `${topLine.clientHeight}px`;
        topLine.classList.remove('show');
        await delayFor(300, () => {
          topLine.classList.add('hide');
        });
      }

      const line = this.content[i];
      const newLine: HTMLSpanElement = this.renderer.createElement('span');
      newLine.innerHTML = line;
      if (line.length === 0) {
        newLine.classList.add('gap');
      }
      newLine.style.transition = `opacity ${this.fadingTime ||
        0.3}s, height ${this.fadingTime || 0.3}s`;
      this.scoller.nativeElement.appendChild(newLine);

      await delayFor((this.fadingTime || 0.3) * 1000);
      this.renderer.addClass(newLine, 'show');
    }
  }
}
