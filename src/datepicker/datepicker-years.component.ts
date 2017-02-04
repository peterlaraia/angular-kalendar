import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DateUtils } from './utils/util';
import { View } from './view';

@Component({
    moduleId: module.id,
    selector: 'date-picker-years',
    template: `
    <table [style.height.rem]="4">
        <thead>
            <tr class="calendar-header" [style.height.rem]="2">
                <th class="ang2cal-prev-btn ang2cal-btn" (click)="prevDecade()">◄</th>
                <th colspan="8" class="ang2cal-selectable" (click)="onViewHigher($event)">{{displayDate?.getFullYear() - (displayDate?.getFullYear() % 10)}}'s</th>
                <th class="ang2cal-next-btn ang2cal-btn" (click)="nextDecade()">►</th>
            </tr>
        </thead>
        <tbody>
            <tr [style.height.rem]="2">
                <td *ngFor="let year of years;" (click)="updateYear(year, $event)" 
                class="ang2cal-year ang2cal-selectable">
                {{year}}
                </td>
            </tr>
        </tbody>
    </table>
    `
})
export class DatePickerYearsComponent implements OnInit {
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
        this.viewChange.emit(View.Decades);
    }

    years: number[];
    
    ngOnInit() { 
        this.reset();
    }

    reset() {
        this.years = DateUtils.buildDecade(this.displayDate.getFullYear());
    }

    updateYear(year: number, e: any) {
        this.displayDate.setFullYear(year);
        e.stopPropagation();
        this.viewChange.emit(View.Months);
    }

    prevDecade() {
        this.displayDate.setFullYear(this.displayDate.getFullYear() - 10);
        this.reset();
    }

    nextDecade() {
        this.displayDate.setFullYear(this.displayDate.getFullYear() + 10);
        this.reset();
    }
}