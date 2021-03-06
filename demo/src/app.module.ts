import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BasicComponent } from './examples/basic-example.component';
import { CssComponent } from './examples/css-example.component';
import { FormGroupComponent } from './examples/formgroup-example.component';
import { Hours12Component } from './examples/hours12-example.component';
import { NgModelComponent } from './examples/ngmodel-example.component';

import { AngularKalendarModule } from './../../lib/angular-kalendar.module';

@NgModule({
    imports: [AngularKalendarModule, BrowserModule, FormsModule, ReactiveFormsModule],
    exports: [],
    declarations: [AppComponent, BasicComponent, FormGroupComponent, Hours12Component, NgModelComponent, CssComponent],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule { }
