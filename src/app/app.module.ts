import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ThreeCss3Component } from './three-css3/three-css3.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeCss3Component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
