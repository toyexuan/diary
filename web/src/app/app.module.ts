import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './ui/background/background.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { TabComponent } from './ui/tab/tab.component';
import { ScrollerComponent } from './ui/scroller/scroller.component';
import { SharesModule } from './diary-page/shares/shares.module';
import { ModalComponent } from './ui/modal/modal.component';
import { EditorComponent } from './editor/editor.component';
@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    HomeComponent,
    PageNotFoundComponent,
    TabComponent,
    ScrollerComponent,
    ModalComponent,
    EditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    SharesModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
