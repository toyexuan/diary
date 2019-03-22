import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HisDiaryModule } from './diary-page/his-diary/his-diary.module';
import { HerDiaryModule } from './diary-page/her-diary/her-diary.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'he',
    loadChildren: () => HisDiaryModule,
  },
  {
    path: 'she',
    loadChildren: () => HerDiaryModule,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
    HisDiaryModule,
    HerDiaryModule,
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
