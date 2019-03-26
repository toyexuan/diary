import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  faPlay,
  faPause,
  faForward,
  faFastForward,
  faVolumeUp,
  faVolumeMute
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnChanges {
  @Input() audio = '';
  @ViewChild('audioController') audioController: ElementRef<HTMLAudioElement>;

  playIcon = faPlay;
  pauseIcon = faPause;
  forwardIcon = faForward;
  stepForwardIcon = faFastForward;
  volumeUpIcon = faVolumeUp;
  volumeMuteIcon = faVolumeMute;

  isPlaying = false;
  isMuted = false;

  constructor() {}

  async ngOnChanges(changes: SimpleChanges) {
    if (
      changes.audio.currentValue !== changes.audio.previousValue &&
      this.audioController
    ) {
      this.audioController.nativeElement.load();
      this.audioController.nativeElement.volume = 0.2;
      await this.audioController.nativeElement.play();
      this.isPlaying = true;
    }
  }

  onMuteClicked() {
    if (this.isMuted) {
      this.audioController.nativeElement.volume = 0.2;
    } else {
      this.audioController.nativeElement.volume = 0;
    }
    this.isMuted = !this.isMuted;
  }

  async onPlayClicked() {
    if (!this.audio) {
      return;
    }

    if (this.isPlaying) {
      this.audioController.nativeElement.pause();
    } else {
      this.audioController.nativeElement.volume = 0.2;
      await this.audioController.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
