export interface DatepickerOptions {
    format: string,
    hours24: boolean,
    showTimepicker: boolean
}

export const DEFAULT_OPTIONS: DatepickerOptions = {
    format: 'yyyy-mm-dd H:MM',
    hours24: true,
    showTimepicker: true
 }