import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <div>DateTimePicker Demo</div>
        <div>
            <span datetimePicker></span>
        </div>
    `
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}