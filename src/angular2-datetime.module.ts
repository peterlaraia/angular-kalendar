import { NgModule } from '@angular/core';

import { DatePickerComponent } from './datepicker/datepicker.component';
import { DatetimeComponent }   from './datetime.component';
import { TimePickerComponent } from './timepicker/timepicker.component';

@NgModule({
    imports: [],
    declarations: [DatetimeComponent, DatePickerComponent, TimePickerComponent],
    providers: [],
    exports: [DatetimeComponent, DatePickerComponent, TimePickerComponent]
})
export class Angular2DatetimeModule { }
