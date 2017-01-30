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
        <th class="prev-calendar-btn calendar-btn" (click)="prevMonth()">◄</th>
        <th colspan="5" class="scope-out">{{MONTHS[date.getMonth()]}} {{date.getFullYear()}}</th>
        <th class="next-calendar-btn calendar-btn" (click)="nextMonth()">►</th>
      </tr>
      <tr>
        <th class="day-of-week">Su</th>
        <th class="day-of-week">Mo</th>
        <th class="day-of-week">Tu</th>
        <th class="day-of-week">We</th>
        <th class="day-of-week">Th</th>
        <th class="day-of-week">Fr</th>
        <th class="day-of-week">Sa</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let week of month">
        <th *ngFor="let day of week" (click)="updateDate(day)">
          {{day.getDate()}}
        </th>
      </tr>
    </tbody>
  </table>
  `
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
  
  month: Date[][] = [];
  MONTHS = CalendarDisplay.MONTHS;
  
  ngOnInit(): void {
    this.reset();
  }
  
  updateDate(newDate: Date): void {
    this.date = newDate;
  }
  
  reset(): void {
    this.month = DateUtils.buildCalendar(this.date.getMonth(), this.date.getFullYear());
  }
  
  nextMonth(): void {
    this.date.setMonth(this.date.getMonth() + 1);
    this.reset();
  }
  
  prevMonth(): void {
    this.date.setMonth(this.date.getMonth() - 1);
    this.reset();
  }
}