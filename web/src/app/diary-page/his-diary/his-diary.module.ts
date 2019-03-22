import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HisDiaryRoutingModule } from './his-diary-routing.module';
import { SharesModule } from '../shares/shares.module';

@NgModule({
  imports: [
    CommonModule,
    HisDiaryRoutingModule,
    SharesModule
  ],
  declarations: []
})
export class HisDiaryModule { }
