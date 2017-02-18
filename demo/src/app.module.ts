import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicComponent } from './examples/basic-example.component';
import { FormGroupComponent } from './examples/formgroup-example.component';
import { Hours12Component } from './examples/hours12-example.component';
import { NgModelComponent } from './examples/ngmodel-example.component';

const Angular2DatetimeModule = require('angular2-datetime').Angular2DatetimeModule;

@NgModule({
    imports: [Angular2DatetimeModule, BrowserModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [AppComponent, BasicComponent, FormGroupComponent, Hours12Component, NgModelComponent],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule { }
