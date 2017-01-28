import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DatePickerComponent } from './datepicker/datepicker.component';
import { DatePickerDaysComponent } from './datepicker/datepicker-days.component';
import { DatetimeComponent }   from './datetime.component';
import { TimePickerComponent } from './timepicker/timepicker.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DatetimeComponent, DatePickerComponent, TimePickerComponent, DatePickerDaysComponent],
    providers: [],
    exports: [DatetimeComponent, DatePickerComponent, TimePickerComponent]
})
export class Angular2DatetimeModule { }
