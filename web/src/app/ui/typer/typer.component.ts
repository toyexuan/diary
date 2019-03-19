import {
  Component,
  AfterContentInit,
  Input,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';

@Component({
  selector: 'app-typer',
  templateUrl: './typer.component.html',
  styleUrls: ['./typer.component.scss']
})
export class TyperComponent implements AfterContentInit {
  @Input() content: string[];
  @Input() typeSpeed: number;
  @Input() breakDelay: number;
  @ViewChild('typer') typer: ElementRef<HTMLDivElement>;
  @ViewChild('cursor') cursor: ElementRef<HTMLSpanElement>;

  constructor(private renderer: Renderer2) {}

  async ngAfterContentInit() {
    if (!this.content) {
      return;
    }
    for (let j = 0; j < this.content.length; j++) {
      const line = this.content[j];
      const newLine = this.renderer.createElement('span');
      this.typer.nativeElement.insertBefore(newLine, this.cursor.nativeElement);

      for (let i = 0; i < line.length; i++) {
        await this.delayFor(this.typeSpeed || 80, () => {
          newLine.innerHTML += line.charAt(i);
        });
      }
      const isLast = this.content.indexOf(line) === this.content.length - 1;
      if (!isLast) {
        const breakTime =
          line.length === 0 ||
          (j + 1 < this.content.length && this.content[j + 1].length === 0)
            ? 0
            : this.breakDelay || 300;
        await this.delayFor(breakTime, () => {
          newLine.style.width = '100%';
        });
        await this.delayFor(this.breakDelay || 300);
      }
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
