import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerDaysComponent } from './datepicker/datepicker-days.component';
import { DatePickerMonthsComponent } from './datepicker/datepicker-months.component';
import { DatetimeComponent }   from './datetime.component';
import { TimePickerComponent } from './timepicker/timepicker.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DatetimeComponent, TimePickerComponent, DatePickerDaysComponent, DatePickerMonthsComponent],
    providers: [],
    exports: [DatetimeComponent, TimePickerComponent]
})
export class Angular2DatetimeModule { }
