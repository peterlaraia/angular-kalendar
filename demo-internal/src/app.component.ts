import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <div>DateTimePicker Demo</div>
        <div style="height:100px; width:100px" datetimePicker></div>
    `
})
export class AppComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}