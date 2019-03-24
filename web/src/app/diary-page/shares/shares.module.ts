import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

import { ListComponent } from '../list/list.component';
import { DiaryComponent } from '../diary/diary.component';
import { PlayerComponent } from 'src/app/ui/player/player.component';
import { CommentComponent } from '../comment/comment.component';
import { TyperComponent } from 'src/app/ui/typer/typer.component';
import { ButtonComponent } from 'src/app/ui/button/button.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, FormsModule, FontAwesomeModule],
  declarations: [
    ListComponent,
    DiaryComponent,
    PlayerComponent,
    CommentComponent,
    TyperComponent,
    ButtonComponent
  ],
  exports: [
    ListComponent,
    DiaryComponent,
    PlayerComponent,
    CommentComponent,
    TyperComponent,
    ButtonComponent
  ]
})
export class SharesModule {}
