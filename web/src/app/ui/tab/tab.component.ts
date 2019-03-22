import { Component, OnInit } from '@angular/core';
import { faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  public faLockIcon: IconDefinition = faLock;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onClickHisDiary() {
    this.router.navigate(['he']);
  }
  onClickHerDiary() {
    this.router.navigate(['she']);
  }
  onClickHome() {
    this.router.navigate(['']);
  }
}
