import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AdamkeyModule } from '../src';

import { AppComponent } from './app.component';
import {AdamKeyChartComponent} from "../src/components/AdamkeyChartComponent";
import {FormsModule} from "@angular/forms";

declare const process: any;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AdamkeyModule
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
