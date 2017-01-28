import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'date-picker',
    template: `
    <div class="date-picker">
        <date-picker-days [(date)]="date"></date-picker-days>
    </div>
    `,
    styles: [`
        .date-picker {
            position: absolute;
            display: block;
            min-width:100px;
            text-align: center;
            background: white;
            border: 1px solid rgba(0, 0, 0, .15);
            box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
            top: 20px;
            z-index:10;
        }
        
        :host /deep/ .calendar-btn {
            -webkit-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -ms-user-select: none;
            
            cursor: pointer;
        }
    `]
})
export class DatePickerComponent {
    date = new Date();
}