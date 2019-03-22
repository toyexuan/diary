import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './ui/background/background.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { TabComponent } from './ui/tab/tab.component';
import { ScrollerComponent } from './ui/scroller/scroller.component';
import { SharesModule } from './diary-page/shares/shares.module';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    HomeComponent,
    PageNotFoundComponent,
    TabComponent,
    ScrollerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
