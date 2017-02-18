import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DatePickerDaysComponent } from './datepicker/datepicker-days.component';
import { DatePickerMonthsComponent } from './datepicker/datepicker-months.component';
import { DatePickerYearsComponent } from './datepicker/datepicker-years.component';
import { DatetimeComponent }   from './datetime.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [DatetimeComponent, DatePickerDaysComponent, DatePickerMonthsComponent, DatePickerYearsComponent],
    providers: [],
    exports: [DatetimeComponent]
})
export class Angular2DatetimeModule { }
