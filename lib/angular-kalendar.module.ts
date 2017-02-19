import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatePickerDaysComponent } from './datepicker/datepicker-days.component';
import { DatePickerMonthsComponent } from './datepicker/datepicker-months.component';
import { DatePickerYearsComponent } from './datepicker/datepicker-years.component';
import { AngularKalendarComponent }   from './angular-kalendar.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [AngularKalendarComponent, DatePickerDaysComponent, DatePickerMonthsComponent, DatePickerYearsComponent],
    providers: [],
    exports: [AngularKalendarComponent]
})
export class AngularKalendarModule { }
