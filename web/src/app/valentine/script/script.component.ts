import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'app-script',
  templateUrl: './script.component.html',
  styleUrls: ['./script.component.scss']
})
export class ScriptComponent implements AfterViewInit {
  @Input() public ngClass: string[];
  @Input() public variant: 'scroll' | 'typing';
  @Input() public content: string[];
  @Input() public hideAfterShowing: boolean;

  @ViewChild('scollContent') public scollContent: ElementRef<HTMLSpanElement>;
  @ViewChild('typingContent') public typingContent: ElementRef<HTMLSpanElement>;

  constructor() {}

  async ngAfterViewInit() {
    if (this.variant === 'scroll') {
      const display = async (line: string, delay: number = 5000) =>
        new Promise(r => {
          setTimeout(() => {
            this.scollContent.nativeElement.innerHTML = line;
            r();
          }, delay);
        });

      let first = true;
      for (const line of this.content) {
        if (first) {
          await display(line, 4000);
          this.scollContent.nativeElement.className += ' fadeInOut';
          first = false;
          continue;
        }

        await display(line);
      }
      setTimeout(() => {
        this.scollContent.nativeElement.className = this.scollContent.nativeElement.className.replace(
          ' fadeInOut',
          ''
        );
        if (this.hideAfterShowing) {
          this.scollContent.nativeElement.className += ' fadeOut';
        }
      }, 2500);
    }
  }
}
