import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { faPlay, faPause, faForward, faFastForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() audio: string;
  @ViewChild('audioController') audioController: ElementRef<HTMLAudioElement>;

  playIcon = faPlay;
  pauseIcon = faPause;
  forwardIcon = faForward;
  stepForwardIcon = faFastForward;
  volumeUpIcon = faVolumeUp;
  volumeMuteIcon = faVolumeMute;

  isPlaying = false;
  isMuted = false;

  constructor() { }

  ngOnInit () {
    const context = new AudioContext();
    context.onstatechange = () => {
      if (context.state === 'running') {
        if (!this.audioController) {
          return;
        }

        this.audioController.nativeElement.volume = 0.2;
        this.audioController.nativeElement.play().then(() => {
          this.isPlaying = true;
        });
      }
    };
  }

  onMuteClicked() {
    if (this.isMuted) {
      this.audioController.nativeElement.volume = 0.2;
    } else {
      this.audioController.nativeElement.volume = 0;
    }
    this.isMuted = !this.isMuted;
  }

  onPlayClicked() {
    if (this.isPlaying) {
      this.audioController.nativeElement.pause();
    } else {
      this.audioController.nativeElement.volume = 0.2;
      this.audioController.nativeElement.play();
    }
    this.isPlaying = !this.isPlaying;
  }
}
