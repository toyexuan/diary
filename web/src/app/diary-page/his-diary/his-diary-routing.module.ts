import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from '../list/list.component';
import { DiaryComponent } from '../diary/diary.component';

const routes: Routes = [
  {
    path: 'he',
    component: ListComponent,
  },
  {
    path: 'he/:diaryId',
    component: DiaryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HisDiaryRoutingModule { }
