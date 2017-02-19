import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    template: `
        <basic-example></basic-example><br>
        <formgroup-example></formgroup-example><br>
        <ngmodel-example></ngmodel-example><br>
        <hours12-example></hours12-example><br>
        <css-example></css-example><br>
    `
})
export class AppComponent {
}