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
        <td *ngFor="let day of week" (click)="updateDate(day)" class="calendar-day" [ngClass]="{'calendar-selected': dayIsSelected(day)}">
          {{day.getDate()}}
        </td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    .calendar-day:hover {
      background-color: rgba(200, 200, 200, 0.5);
    }

    .calendar-day.calendar-selected {
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

  dayIsSelected(day: Date): boolean {
      return day.getDate() == this.date.getDate() &&
             day.getMonth() == this.date.getMonth() &&
             day.getFullYear() == this.date.getFullYear();
  }
}