import { DateUtils } from './datepicker/utils/util';
import { Component, ElementRef, forwardRef, Input, HostListener, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { DateFormatter } from './datepicker/utils/date-formatter';
import { View } from './datepicker/view';

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
    <input (focus)="onFocus()" type="text" [value]="getFormattedDate()"/>
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
    view: View = undefined;
    views = View;

    @Input() options: any = {
        showTimepicker: true
    };    

    propagateChange = (_: any) => {/*will be reassigned*/};
    propagateTouch = () => {/*will be reassigned*/};

    @HostListener('document:click', ['$event'])
    onClick(e: any): void {
        if (this.view && !this.el.nativeElement.contains(e.target)) {
            this.displayDate = undefined;
            this.updateView(undefined);
        }
    }

    constructor(private el: ElementRef) {}

    ngOnInit(): void {
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
        return DateFormatter.formatDate(this.date, 'm/d/yyyy');
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

    onDateChange(newDate: Date): void {
        this.date = newDate;
        this.propagateChange(this.date);
    }
}
