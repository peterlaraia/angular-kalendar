import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'date-picker',
    template: `
    <div class="date-picker">
        <date-picker-days [(date)]="date"></date-picker-days>
    </div>
    `
})
export class DatePickerComponent {
    date = new Date();
}