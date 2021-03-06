import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { DateUtils } from './utils/util';
import { View } from './view';

@Component({
    selector: 'date-picker-years',
    template: `
    <table [style.height.rem]="4">
        <thead>
            <tr class="calendar-header" [style.height.rem]="2">
                <th class="ang2cal-prev-btn ang2cal-btn" (click)="prev()"></th>
                <th colspan="8" [ngClass]="{'ang2cal-selectable': !centuryView}" (click)="onViewHigher($event)">
                    <div>
                        {{displayDate?.getFullYear() - (displayDate?.getFullYear() % (centuryView ? 100 : 10))}}
                        -
                        {{(displayDate?.getFullYear() - (displayDate?.getFullYear() % (centuryView ? 100 : 10))) + (centuryView ? 100 : 10)}}
                    </div>
                </th>
                <th class="ang2cal-next-btn ang2cal-btn" (click)="next()"></th>
            </tr>
        </thead>
        <tbody>
            <tr [style.height.rem]="2">
                <td *ngFor="let year of years;" (click)="updateYear(year, $event)" 
                class="ang2cal-year ang2cal-selectable" 
                [ngClass]="{'ang2cal-selected': centuryView ? displayDate?.getFullYear() - displayDate?.getFullYear() % 10 === year : year === displayDate?.getFullYear()}">
                {{year}}
                </td>
            </tr>
        </tbody>
    </table>
    `,
    styles: [`
        .ang2cal-year:hover {
            border-radius: 8px;
        }
    `]
})
export class DatePickerYearsComponent implements OnInit {
    years: number[];

    @Input() centuryView: boolean = false;
    @Output() viewChange: EventEmitter<View> = new EventEmitter();

    displayDateValue: Date;
    @Output() displayDateChange = new EventEmitter();
    @Input() get displayDate() {
        return this.displayDateValue;
    }
    set displayDate(val: Date) {
        this.displayDateValue = val;
        this.displayDateChange.emit(this.displayDateValue);
    }
    
    ngOnInit() { 
        this.reset();
    }

    reset() {
        let year = this.displayDate.getFullYear();
        this.years = this.centuryView ? DateUtils.buildCentury(year) : DateUtils.buildDecade(year);
    }

    updateYear(year: number, e: any) {
        this.displayDate.setFullYear(this.centuryView && (this.displayDate.getFullYear() - this.displayDate.getFullYear() % 10) === year ? this.displayDate.getFullYear() : year);
        e.stopPropagation();
        this.viewChange.emit(this.centuryView ? View.Years : View.Months);
    }

    prev() {
        this.displayDate.setFullYear(this.displayDate.getFullYear() - (this.centuryView ? 100 : 10));
        this.reset();
    }

    next() {
        this.displayDate.setFullYear(this.displayDate.getFullYear() + (this.centuryView ? 100 : 10));
        this.reset();
    }

    onViewHigher(e: any) {
        if (!this.centuryView) {
            e.stopPropagation();
            this.viewChange.emit(View.Decades);
        }
    }
}
