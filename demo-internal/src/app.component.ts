import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <div>DateTimePicker Demo</div>
        <date-time-picker></date-time-picker>
    `
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}