import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { delayFor } from 'src/app/lib/sleep';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements AfterViewInit {
  private bgImages: string[] = [];
  @Input() public changeTime: number;
  @Input() public infinite = false;
  @Input() public viewAnimation = false;
  @Input() public set images(images: string[]) {
    this.bgImages = images;
    this.animate();
  }

  @ViewChild('bgImage') bgImageRef: ElementRef<HTMLImageElement>;
  @ViewChild('bgImageTwo') bgImageTwoRef: ElementRef<HTMLImageElement>;

  public get images() {
    return this.bgImages;
  }

  public bgImageUrl = '';
  public bgImageTwoUrl = '';
  public showBgImage = false;
  public showBgImageTwo = false;

  constructor() {}

  ngAfterViewInit() {
    this.animate();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const offsetX = ((window.innerWidth / 2 - e.pageX) / window.innerWidth) * 3;
    const offsetY =
      ((window.innerHeight / 2 - e.pageY) / window.innerHeight) * 3;
    this.bgImageRef.nativeElement.style.left = `${offsetX}%`;
    this.bgImageTwoRef.nativeElement.style.left = `${offsetX}%`;
    this.bgImageRef.nativeElement.style.top = `${offsetY}%`;
    this.bgImageTwoRef.nativeElement.style.top = `${offsetY}%`;
  }

  private async animate() {
    if (!this.images) {
      return;
    } else if (this.images.length === 1) {
      if (this.showBgImage) {
        this.bgImageTwoUrl = this.images[0];
        delayFor(100, () => {
          this.showBgImage = false;
          this.showBgImageTwo = true;
        });
      } else {
        this.bgImageUrl = this.images[0];
        delayFor(100, () => {
          this.showBgImage = true;
          this.showBgImageTwo = false;
        });
      }
    } else {
      do {
        let isFirst = !this.showBgImage;
        for (const image of this.images) {
          isFirst ? (this.bgImageUrl = image) : (this.bgImageTwoUrl = image);
          await delayFor(100, () => {
            if (isFirst) {
              this.showBgImage = true;
              this.showBgImageTwo = false;
            } else {
              this.showBgImage = false;
              this.showBgImageTwo = true;
            }
          });
          await delayFor(this.changeTime || 5000);
          isFirst = !isFirst;
        }
      } while (this.infinite);
    }
  }
}
