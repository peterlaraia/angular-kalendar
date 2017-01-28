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
    `
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