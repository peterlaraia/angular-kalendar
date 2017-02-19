import { CalendarDisplay } from './calendar-display';
import { DateUtils } from './util';

export class DateFormatter {
    static formatMap: {[key: string]: Function} = {
        'd': (date: Date, modifier?: boolean) => `${date.getDate()}`,
        'dd': (date: Date, modifier?: boolean) => `${date.getDate() < 10 ? 0 : ''}${date.getDate()}`,
        'm': (date: Date, modifier?: boolean) => `${date.getMonth() + 1}`,
        'mm': (date: Date, modifier?: boolean) => `${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}`,
        'mmm': (date: Date, modifier?: boolean) => `${CalendarDisplay.MONTHS[date.getMonth()].substr(0, 3)}`,
        'mmmm': (date: Date, modifier?: boolean) => `${CalendarDisplay.MONTHS[date.getMonth()]}`,
        'yy': (date: Date, modifier?: boolean) => `${date.getFullYear()}`.substring(2),
        'yyyy': (date: Date, modifier?: boolean) => `${date.getFullYear()}`,
        'H': (date: Date, modifier?: boolean) => `${modifier ? DateUtils.hoursTo12(date.getHours())[0] : date.getHours()}`,
        'HH': (date: Date, modifier?: boolean) => {
            let hours: number = modifier ? DateUtils.hoursTo12(date.getHours())[0] : date.getHours();
            return `${hours < 10 ? 0 : ''}${hours}`;
        },
        'MM': (date: Date, modifier?: boolean) => `${date.getMinutes() < 10 ? 0 : ''}${date.getMinutes()}`
    };

    static formatDate(date: Date, format: string, hr24 = true): string {
        let formattedDate: string = '';
        let pattern: string = undefined;
        for(let i = 0; i < format.length; i++) {
            const char: string = format.charAt(i);
            if (!pattern) pattern = char;
            else if (pattern.length && pattern.charAt(0) === char) pattern += char;
            else {
                if (pattern.charAt(0) === 'H' && !hr24) {
                    formattedDate += DateFormatter.formatMap[pattern] ? DateFormatter.formatMap[pattern](date, true) : pattern;
                } else {
                    formattedDate += DateFormatter.formatMap[pattern] ? DateFormatter.formatMap[pattern](date) : pattern;
                }
                pattern = char;
            }
        }
        formattedDate += DateFormatter.formatMap[pattern] ? DateFormatter.formatMap[pattern](date) : pattern;
        if (!hr24) {
            formattedDate += ` ${DateUtils.hoursTo12(date.getHours())[1]}`;
        }
        return formattedDate;
    }
}
