import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../list/list.component';
import { DiaryComponent } from '../diary/diary.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ListComponent, DiaryComponent]
})
export class SharesModule { }
