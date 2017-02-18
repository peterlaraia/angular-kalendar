import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'hours12-example',
    template: `
    <div [style.height.rem]="6">
        12-Hour Demo<br>
        <angular-kalendar [options]="options"></angular-kalendar>
    </div>
    `
})
export class Hours12Component implements OnInit {
    options: any = {
        hours24: false
    }

    constructor() { }

    ngOnInit() { }
}