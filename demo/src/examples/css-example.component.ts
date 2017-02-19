import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'css-example',
    template: `
    <div [style.height.rem]="6">
        Custom CSS Demo<br>
        <angular-kalendar class="kalendar"></angular-kalendar>
    </div>
    `,
    styles: [`
        /deep/ .kalendar .ang2cal-btn:hover {
            background-color: blue;
            color: white;
            border-radius: none;
        }
    `]
})
export class CssComponent {
}