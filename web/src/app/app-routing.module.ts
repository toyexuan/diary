import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DiaryComponent } from './diary-page/diary/diary.component';
import { SharesModule } from './diary-page/shares/shares.module';
import { ListComponent } from './diary-page/list/list.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: ':author',
    component: ListComponent
  },
  {
    path: 'diary/:diaryId',
    component: DiaryComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false }),
    SharesModule,
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule {}
