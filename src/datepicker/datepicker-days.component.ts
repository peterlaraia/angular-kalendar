import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CalendarDisplay } from './utils/calendar-display';
import { DateUtils } from './utils/util';
import { View } from './view';

@Component({
  moduleId: module.id,
  selector: 'date-picker-days',
  template: `
  <table [style.height.rem]="3.5 + 2*month?.length" [style.width.rem]="14">
    <colgroup>
      <col style="width: 2rem">
      <col style="width: 2rem">
      <col style="width: 2rem">
      <col style="width: 2rem">
      <col style="width: 2rem">
      <col style="width: 2rem">
      <col style="width: 2rem">
    </colgroup>
    <thead>
      <tr class="calendar-header" [style.height.rem]="2">
        <th class="ang2cal-prev-btn ang2cal-btn" (click)="prevMonth()"></th>
        <th colspan="5" class="ang2cal-selectable" (click)="onViewHigher($event)">
          <div>{{MONTHS[displayDate?.getMonth()]}} {{displayDate?.getFullYear()}}</div>
        </th>
        <th class="ang2cal-next-btn ang2cal-btn" (click)="nextMonth()"></th>
      </tr>
      <tr [style.height.rem]="1.5">
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

    .ang2cal-day:hover {
      border-radius: 8px;
    }
  `]
})
export class DatePickerDaysComponent implements OnInit {
  month: Date[][] = [];
  MONTHS = CalendarDisplay.MONTHS;

  @Input() date: Date;
  @Output() dateChange = new EventEmitter();
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

  ngOnInit(): void {
    this.reset();
  }

  updateDate(newDate: Date): void {
    newDate.setHours(this.date.getHours());
    newDate.setMinutes(this.date.getMinutes());
    this.date = newDate;
    this.displayDate = this.dayInThisMonth(newDate) ? new Date(newDate.getTime()) : this.displayDate;
    this.dateChange.emit(this.date);
  }

  reset(): void {
    this.month = DateUtils.buildCalendar(this.displayDate.getMonth(), this.displayDate.getFullYear());
  }

  nextMonth(): void {
    this.displayDate.setDate(1);
    this.displayDate.setMonth(this.displayDate.getMonth() + 1);
    this.reset();
  }

  prevMonth(): void {
    this.displayDate.setDate(1);
    this.displayDate.setMonth(this.displayDate.getMonth() - 1);
    this.reset();
  }

  dayIsSelected(day: Date): boolean {
      return day.getDate() === this.date.getDate() &&
             day.getMonth() === this.date.getMonth() &&
             day.getFullYear() === this.date.getFullYear();
  }

  dayInThisMonth(day: Date): boolean {
      return day.getMonth() === this.displayDate.getMonth() && 
      day.getFullYear() === this.displayDate.getFullYear();
  }

  onViewHigher(e: any) {
    e.stopPropagation();
    this.viewChange.emit(View.Months);
  }
}
