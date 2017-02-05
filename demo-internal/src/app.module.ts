
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

const Angular2DatetimeModule = require('angular2-datetime').Angular2DatetimeModule;

@NgModule({
    imports: [Angular2DatetimeModule, BrowserModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule { }
