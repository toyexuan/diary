import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './ui/background/background.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { TabComponent } from './ui/tab/tab.component';
import { PlayerComponent } from './ui/player/player.component';
import { ScrollerComponent } from './ui/scroller/scroller.component';
import { TyperComponent } from './ui/typer/typer.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    HomeComponent,
    PageNotFoundComponent,
    TabComponent,
    PlayerComponent,
    ScrollerComponent,
    TyperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
