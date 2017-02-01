import {Component, EventEmitter, Input, Output} from '@angular/core';

import { CalendarDisplay } from './utils/calendar-display'
import { DateUtils } from './utils/util';

@Component({
  moduleId: module.id,
  selector: 'date-picker-days',
  template: `
  <table>
    <thead>
      <tr class="calendar-header">
        <th class="ang2cal-prev-btn ang2cal-btn" (click)="prevMonth()">◄</th>
        <th colspan="5" class="ang2cal-selectable">{{MONTHS[currentCalendarMonth.getMonth()]}} {{currentCalendarMonth.getFullYear()}}</th>
        <th class="ang2cal-next-btn ang2cal-btn" (click)="nextMonth()">►</th>
      </tr>
      <tr>
        <th class="ang2cal-dow">Su</th>
        <th class="ang2cal-dow">Mo</th>
        <th class="ang2cal-dow">Tu</th>
        <th class="ang2cal-dow">We</th>
        <th class="ang2cal-dow">Th</th>
        <th class="ang2cal-dow">Fr</th>
        <th class="ang2cal-dow">Sa</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let week of month">
        <td *ngFor="let day of week" (click)="updateDate(day)" 
        class="ang2cal-day ang2cal-selectable" 
        [ngClass]="{'ang2cal-selected': dayIsSelected(day), 'ang2cal-outside-month': !dayInThisMonth(day)}">
          {{day.getDate()}}
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    table {
      border-spacing: 0;
      width: 100%;
      height: 100%;
    }

    .ang2cal-outside-month {
      background-color: #eee;
      color: rgba(0, 0, 0, 0.5);
    }

    .ang2cal-day.ang2cal-selected {
      background-color: rgba(150, 150, 150, 1);
      color: white;
    }
  `]
})
export class DatePickerDaysComponent {
  dateValue: Date;
  @Output() dateChange = new EventEmitter();
  @Input() get date() {
    return this.dateValue;
  }
  set date(val: Date) {
    this.dateValue = val;
    this.dateChange.emit(this.dateValue);
  }

  currentCalendarMonth: Date;
  
  month: Date[][] = [];
  MONTHS = CalendarDisplay.MONTHS;
  
  ngOnInit(): void {
    this.currentCalendarMonth = new Date(this.date.getTime());
    this.reset();
  }
  
  updateDate(newDate: Date): void {
    this.date = newDate;
  }
  
  reset(): void {
    this.month = DateUtils.buildCalendar(this.currentCalendarMonth.getMonth(), this.currentCalendarMonth.getFullYear());
  }
  
  nextMonth(): void {
    this.currentCalendarMonth.setDate(1);
    this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() + 1);
    this.reset();
  }
  
  prevMonth(): void {
    this.currentCalendarMonth.setDate(1);
    this.currentCalendarMonth.setMonth(this.currentCalendarMonth.getMonth() - 1);
    this.reset();
  }

  dayIsSelected(day: Date): boolean {
      return day.getDate() == this.date.getDate() &&
             day.getMonth() == this.date.getMonth() &&
             day.getFullYear() == this.date.getFullYear();
  }

  dayInThisMonth(day: Date): boolean {
      return day.getMonth() === this.currentCalendarMonth.getMonth();
  }
}