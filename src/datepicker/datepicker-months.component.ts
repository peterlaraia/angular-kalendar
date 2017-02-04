import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CalendarDisplay } from './utils/calendar-display';
import { View } from './view';

@Component({
    moduleId: module.id,
    selector: 'date-picker-months',
    template: `
    <table [style.height.rem]="4">
        <thead>
            <tr class="calendar-header" [style.height.rem]="2">
                <th class="ang2cal-prev-btn ang2cal-btn" (click)="prevYear()">◄</th>
                <th colspan="10" class="ang2cal-selectable" (click)="onViewHigher($event)">{{displayDate?.getFullYear()}}</th>
                <th class="ang2cal-next-btn ang2cal-btn" (click)="nextYear()">►</th>
            </tr>
        </thead>
        <tbody>
            <tr [style.height.rem]="2">
                <td *ngFor="let month of months; let i = index;" (click)="updateMonth(i, $event)" 
                class="ang2cal-month ang2cal-selectable">
                {{month}}
                </td>
            </tr>
        </tbody>
    </table>
    `
})
export class DatePickerMonthsComponent implements OnInit {
    displayDateValue: Date;
    @Output() displayDateChange = new EventEmitter();
    @Input() get displayDate() {
        return this.displayDateValue;
    }
    set displayDate(val: Date) {
        this.displayDateValue = val;
        this.displayDateChange.emit(this.displayDateValue);
    }

    @Output() viewChange: EventEmitter<View> = new EventEmitter();
    onViewHigher(e: any) {
        e.stopPropagation();
        this.viewChange.emit(View.Years);
    }

    months = CalendarDisplay.MONTHS_SHORT;

    ngOnInit(): void {

    }

    updateMonth(month: number, e: any) {
        this.displayDate.setDate(1);
        this.displayDate.setMonth(month);
        e.stopPropagation();
        this.viewChange.emit(View.Calendar);
    }

    prevYear(): void {
        this.displayDate.setFullYear(this.displayDate.getFullYear() - 1);
    }

    nextYear(): void {
        this.displayDate.setFullYear(this.displayDate.getFullYear() + 1);
    }
}