import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HisDiaryModule } from './his-diary/his-diary.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'he',
    loadChildren: () => HisDiaryModule,
  },
  {
    path: '*',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
    HisDiaryModule,
    CommonModule
  ],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule { }
