import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @Input() public url: string;

  @ViewChild('bgPicture') public bgPicture: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit() {
    this.bgPicture.nativeElement.style.backgroundImage = `url(${this.url})`;
  }

}
