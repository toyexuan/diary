import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit
} from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { DataService } from 'src/app/services/data.service';
import { BROADCAST_DATA_TYPE } from 'src/app/lib/types/data.types';
import { UserService } from 'src/app/services/user.service';
import { delayFor } from 'src/app/lib/sleep';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modal') modalController: ElementRef<HTMLDivElement>;
  @ViewChild('birthQ') birthQuestion: ElementRef<HTMLSpanElement>;
  @ViewChild('birthA') birthAnswer: ElementRef<HTMLInputElement>;
  @ViewChild('passQ') passQuestion: ElementRef<HTMLSpanElement>;
  @ViewChild('passQ') passAnswer: ElementRef<HTMLInputElement>;
  constructor(
    private dataService: DataService,
    private userService: UserService
  ) {}

  public arrowRight = faArrowRight;
  public show = false;
  public showBirth = true;
  public showPass = false;

  public birthday: string;
  public password: string;

  ngOnInit() {
    this.userService.getCachedUserProfile().subscribe(user => {
      if (user && user.userId) {
        this.showBirth = false;
        this.showPass = true;
      }
    });
  }

  ngAfterViewInit() {
    this.dataService.currentMessage<boolean>().subscribe(response => {
      if (response.type === BROADCAST_DATA_TYPE.MODAL_POPUP) {
        this.show = true;
      }
    });
  }

  onHideBirth() {
    this.showBirth = false;
    this.showPass = true;
    delayFor(300, () => {
      this.birthQuestion.nativeElement.style.display = 'none';
      this.birthAnswer.nativeElement.style.display = 'none';
    });
  }

  onHidePass() {
    this.showBirth = true;
    this.showPass = false;
    delayFor(300, () => {
      this.passQuestion.nativeElement.style.display = 'none';
      this.passAnswer.nativeElement.style.display = 'none';
    });
  }

  quit() {
    this.show = false;
  }

  onEnter() {
    if (this.birthday) {
      this.userService.login(this.birthday).subscribe(success => {
        if (success) {
          this.show = false;
          this.dataService.sendMessage<boolean>({
            payload: true,
            type: BROADCAST_DATA_TYPE.USER_LOGGEDIN
          });
        }
      });
    } else if (this.password) {
      this.show = false;
      // this.userService.login(this.password).subscribe(success => {
      //   if (success) {
      //     this.show = false;
      //     this.dataService.sendMessage<boolean>({
      //       payload: true,
      //       type: BROADCAST_DATA_TYPE.USER_LOGGEDIN
      //     });
      //   }
      // });
    }
  }
}
