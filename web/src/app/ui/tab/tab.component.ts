import { Component, OnInit } from '@angular/core';
import { faLock, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  public faLockIcon: IconDefinition = faLock;

  constructor() { }

  ngOnInit() {
  }

}
