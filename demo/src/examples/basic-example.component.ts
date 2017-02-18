import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'basic-example',
    template: `
    <div [style.height.rem]="6">
        Basic Demo<br>
        <angular-kalendar></angular-kalendar>
    </div>
    `
})
export class BasicComponent {
}