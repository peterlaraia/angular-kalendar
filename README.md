# Angular Kalendar

## Getting Started

#### Npm Install

```
$ npm install angular-kalendar
```

#### Importing the module


```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularKalendarModule } from 'angular-kalendar';

@NgModule({
    imports: [AngularKalendarModule, BrowserModule],
    exports: [],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule { }
```