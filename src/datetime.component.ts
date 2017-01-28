import { Component, ElementRef, Input, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: '[datetimePicker]',
    template: `
    <div #datePicker>
        <date-picker *ngIf="showDate" style="position: relative"></date-picker>
        <input (focus)="showDate = true" type="text"/>
    </div>
    <div #timePicker *ngIf="options.showTimepicker">
        <time-picker *ngIf="showTime"></time-picker>
        <input (focus)="showTime = true" type="text" />
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
        },
        :host /deep/ .calendar-btn {
            -webkit-user-select: none;
            -moz-user-select: none;
            -khtml-user-select: none;
            -ms-user-select: none;
            
            cursor: pointer;
        }
    `]
})
export class DatetimeComponent {
    @Input() options: any = {
        showTimepicker: true
    }
    private showDate: boolean = false;
    private showTime: boolean = false;
    
    @ViewChild('datePicker') datePickerRef: ElementRef;
    @ViewChild('timePicker') timePickerRef: ElementRef;
    
    @HostListener('document:click', ['$event'])
    onClick(e: any) {
        this.showDate = this.datePickerRef ? this.datePickerRef.nativeElement.contains(e.target) : false;
        this.showTime = this.timePickerRef ? this.timePickerRef.nativeElement.contains(e.target) : false;
    }
}