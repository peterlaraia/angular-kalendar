import { CalendarDisplay } from './calendar-display';
export class DateFormatter {
    static formatMap: {[key: string]: Function} = {
        'd': (date: Date) => `${date.getDate()}`,
        'dd': (date: Date) => `${date.getDate() < 10 ? 0 : ''}${date.getDate()}`,
        'm': (date: Date) => `${date.getMonth() + 1}`,
        'mm': (date: Date) => `${date.getMonth() + 1 < 10 ? 0 : ''}${date.getMonth() + 1}`,
        'mmm': (date: Date) => `${CalendarDisplay.MONTHS[date.getMonth()].substr(0, 3)}`,
        'mmmm': (date: Date) => `${CalendarDisplay.MONTHS[date.getMonth()]}`,
        'yy': (date: Date) => `${date.getFullYear()}`.substring(2),
        'yyyy': (date: Date) => `${date.getFullYear()}`
    };

    static formatDate(date: Date, format: string): string {
        let formattedDate: string = '';
        let pattern: string = undefined;
        for(let i = 0; i < format.length; i++) {
            let char: string = format.charAt(i);
            if (!pattern) pattern = char;
            else if (pattern.length && pattern.charAt(0) === char) pattern += char;
            else {
                formattedDate += DateFormatter.formatMap[pattern] ? DateFormatter.formatMap[pattern](date) : pattern;
                pattern = char;
            }
        }
        formattedDate += DateFormatter.formatMap[pattern] ? DateFormatter.formatMap[pattern](date) : pattern;
        return formattedDate;
    }
}
