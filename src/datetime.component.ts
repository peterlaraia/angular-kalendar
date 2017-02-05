import { Component, ElementRef, Input, HostListener, OnInit, ViewChild } from '@angular/core';

import { DateFormatter } from './datepicker/utils/date-formatter';
import { View } from './datepicker/view';

@Component({
    moduleId: module.id,
    selector: 'date-time-picker',
    template: `
    <div class="ang2cal-datepicker" *ngIf="view" [ngSwitch]="view">
        <date-picker-days *ngSwitchCase="views.Calendar" [(displayDate)]="displayDate" [(date)]="date" (viewChange)="updateView($event)"></date-picker-days>
        <date-picker-months *ngSwitchCase="views.Months" [(displayDate)]="displayDate" (viewChange)="updateView($event)"></date-picker-months>
        <date-picker-years *ngSwitchCase="views.Years"   [(displayDate)]="displayDate" (viewChange)="updateView($event)"></date-picker-years>
        <date-picker-years *ngSwitchCase="views.Decades" [(displayDate)]="displayDate" (viewChange)="updateView($event)" [centuryView]="true"></date-picker-years>
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
    `]
})
export class DatetimeComponent implements OnInit {

    @Input() options: any = {
        showTimepicker: true
    }

    date: Date;
    displayDate: Date;
    view: View = undefined;
    views = View;

    @HostListener('document:click', ['$event'])
    onClick(e: any): void {
        if (this.view && !this.el.nativeElement.contains(e.target)) {
            this.displayDate = undefined;
            this.updateView(undefined);
        }
        //this.view = this.el.nativeElement.contains(e.target) ? this.view : undefined;
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
    }

    updateView(newView: View): void {
        this.view = newView;
    }

    getFormattedDate(): string {
        return DateFormatter.formatDate(this.date, 'm/d/yyyy');
    }
}