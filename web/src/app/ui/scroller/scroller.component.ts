import {
  Component,
  AfterContentInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

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
        this.scoller.nativeElement.children[
          index
        ].className = this.scoller.nativeElement.children[
          index
        ].className.replace('show', '');
      }
      const line = this.content[i];
      const newLine: HTMLSpanElement = this.renderer.createElement('span');
      newLine.innerHTML = line;
      newLine.style.transition = `opacity ${this.fadingTime ||
        0.3}s, height ${this.fadingTime || 0.3}s`;
      this.scoller.nativeElement.appendChild(newLine);

      await this.delayFor((this.fadingTime || 0.3) * 1000);
      this.renderer.addClass(newLine, 'show');
    }
  }

  private delayFor(delay: number, behavior: Function = () => {}) {
    return new Promise(r => {
      setTimeout(() => {
        behavior();
        r();
      }, delay);
    });
  }
}
