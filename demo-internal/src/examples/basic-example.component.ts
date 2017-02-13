import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'basic-example',
    template: `
    <div [style.height.rem]="6">
        Basic Demo<br>
        <date-time-picker></date-time-picker>
    </div>
    `
})
export class BasicComponent {
}