import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AdamkeyModule, AdamKeyChartComponent } from 'adamkey';
import { HttpClientModule } from '@angular/common/http';

declare const process: any;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AdamkeyModule,
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
