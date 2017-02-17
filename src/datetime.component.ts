import { Component, ElementRef, forwardRef, Input, HostListener, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateFormatter } from './datepicker/utils/date-formatter';
import { DateParser } from './datepicker/utils/date-parser';
import { DateUtils } from './datepicker/utils/util';
import { View } from './datepicker/view';
import { DatepickerOptions, DEFAULT_OPTIONS } from './options';

@Component({
    moduleId: module.id,
    selector: 'date-time-picker',
    template: `
    <div class="ang2cal-datepicker" *ngIf="view" [ngSwitch]="view">
        <date-picker-days *ngSwitchCase="views.Calendar" 
        [(displayDate)]="displayDate" 
        [date]="date" 
        (dateChange)="onDateChange($event)" 
        (viewChange)="updateView($event)"></date-picker-days>

        <date-picker-months *ngSwitchCase="views.Months" 
        [(displayDate)]="displayDate" 
        (viewChange)="updateView($event)"></date-picker-months>

        <date-picker-years *ngSwitchCase="views.Years"   
        [(displayDate)]="displayDate" 
        (viewChange)="updateView($event)"></date-picker-years>

        <date-picker-years *ngSwitchCase="views.Decades" 
        [(displayDate)]="displayDate" 
        (viewChange)="updateView($event)" 
        [centuryView]="true"></date-picker-years>
    </div>
    <input #inputField (focus)="onFocus()" (keydown.tab)="parseDate(inputField.value)" type="text" [value]="getFormattedDate()"/>
    `,
    styles: [`
        :host {
            position: relative;
        }

        :host /deep/ .ang2cal-selectable:hover {
            background-color: #ddd;
            cursor: pointer;
        }

        :host /deep/ .ang2cal-btn {
            cursor: pointer;
            border-radius: 100%;
        }

        :host /deep/ .ang2cal-btn:hover {
            background-color: #ddd;
            color: white;
        }

        :host /deep/ .ang2cal-next-btn::before {
            content: "\\232A";
        }

        :host /deep/ .ang2cal-prev-btn::before {
            content: "\\2329";
        }

        :host /deep/ th > div {
            display: inline;
        }

        :host /deep/ .ang2cal-selected {
            background-color: rgba(150, 150, 150, 1);
            color: white;
            border-radius: 8px;
        }

        .ang2cal-datepicker {
            position: absolute;
            display: block;
            text-align: center;
            background: white;
            border: 1px solid rgba(0, 0, 0, .15);
            box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
            top: 20px;
            z-index:10;

            -webkit-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -ms-user-select: none;
            cursor: default;
        }
    `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatetimeComponent),
            multi: true
        }
    ]
})
export class DatetimeComponent implements OnInit, ControlValueAccessor {
    date: Date;
    displayDate: Date;
    view: View;
    views = View;
    @ViewChild('inputField') inputField: ElementRef;

    _options: DatepickerOptions;
    @Input() set options(opt: any) {
        this._options = <DatepickerOptions>{};
        Object.assign(this._options, DEFAULT_OPTIONS, opt);
    }
    get options() {
        return this._options;
    } 

    propagateChange = (_: any) => {/*will be reassigned*/};
    propagateTouch = () => {/*will be reassigned*/};

    @HostListener('document:click', ['$event'])
    onClick(e: any): void {
        if (this.view && !this.el.nativeElement.contains(e.target)) {
            if (this.getFormattedDate() !== this.inputField.nativeElement.value) {
                this.parseDate(this.inputField.nativeElement.value);
            }
            this.displayDate = undefined;
            this.updateView(undefined);
        }
    }

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
        if (!this.options) {
            this.options = DEFAULT_OPTIONS;
        }
        this.date = new Date();
        this.displayDate = new Date();
    }

    onFocus(): void {
        if(!this.view) {
            this.displayDate = new Date(this.date.getTime());
            this.updateView(View.Calendar);
        }
        this.propagateTouch();
    }

    updateView(newView: View): void {
        this.view = newView;
    }

    getFormattedDate(): string {
        return DateFormatter.formatDate(this.date, this.options.format, this.options.hours24);
    }

    parseDate(dateStr: string): void {
        let parsedDate: Date = DateParser.parseDate(dateStr, this.options.format);
        if (parsedDate) {
            this.onDateChange(parsedDate);
        }
        this.updateView(undefined);
    }

    onDateChange(newDate: Date): void {
        this.date = newDate;
        this.propagateChange(this.date);
    }

    /*
     *  ControlValueAccessor Functions
     */

    writeValue(val: any) {
        if (DateUtils.isDate(val)) {
            this.date = val;
            this.displayDate = new Date(this.date.getTime());
        }
    }

    registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.propagateTouch = fn;
    }
}
