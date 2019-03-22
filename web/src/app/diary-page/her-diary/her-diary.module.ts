import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerDiaryRoutingModule } from './her-diary-routing.module';
import { SharesModule } from '../shares/shares.module';

@NgModule({
  imports: [
    CommonModule,
    HerDiaryRoutingModule,
    SharesModule
  ],
  declarations: []
})
export class HerDiaryModule { }
