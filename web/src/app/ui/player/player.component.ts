import { Component, OnInit } from '@angular/core';
import { faPlay, faPause, faForward, faFastForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  playIcon = faPlay;
  pauseIcon = faPause;
  forwardIcon = faForward;
  stepForwardIcon = faFastForward;
  volumeUpIcon = faVolumeUp;
  volumeMuteIcon = faVolumeMute;

  isPlaying = true;
  isMuted = false;

  constructor() { }

  ngOnInit() {
  }

}
