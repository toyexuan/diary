import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'diary';

  bgUrl = './assets/imgs/0.jpg';

  @ViewChild('rootBox') public rootBox: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.rootBox.nativeElement.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.45),rgba(0, 0, 0, 0.3)), url(${this.bgUrl})`;
  }
}
