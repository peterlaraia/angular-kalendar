import { Component, ElementRef, Input, HostListener, OnInit, ViewChild } from '@angular/core';

import { DateFormatter } from './datepicker/utils/date-formatter';

@Component({
    moduleId: module.id,
    selector: 'date-time-picker',
    template: `
    <div class="date-picker" *ngIf="showing">
        <date-picker-days [(date)]="date"></date-picker-days>
    </div>
    <input (focus)="showing = true" type="text" [value]="getFormattedDate()"/>
    `,
    styles: [`
        :host {
            position: relative;
        }

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

            cursor: pointer;

            -webkit-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -ms-user-select: none;
        }
    `]
})
export class DatetimeComponent {

    @Input() options: any = {
        showTimepicker: true
    }

    date: Date = new Date();
    showing: boolean = false;

    @HostListener('document:click', ['$event'])
    onClick(e: any) {
        this.showing = this.el.nativeElement.contains(e.target);
    }

    constructor(private el: ElementRef) {}

    getFormattedDate(): string {
        return DateFormatter.formatDate(this.date, 'm/d/yyyy');
    }
}