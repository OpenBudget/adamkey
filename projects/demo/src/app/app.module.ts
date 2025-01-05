import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { AdamkeyModule } from 'adamkey';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

declare const process: any;

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ], imports: [BrowserModule,
        FormsModule,
        AdamkeyModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
