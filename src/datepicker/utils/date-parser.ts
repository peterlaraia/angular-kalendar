export class DateParser {
    static parseMap: {[key: string]: Function} = {
        'd': (date: Date, day: number) => date.setDate(day),
        'm': (date: Date, month: number) => date.setMonth(month - 1),
        'y': (date: Date, year: number) => date.setFullYear(year < 100 ? year + 2000 : year), //user enters dd/mm/yy, default to 20yy
        'H': (date: Date, hour: number) => date.setHours(hour),
        'M': (date: Date, minute: number) => date.setMinutes(minute)
    }

    static parseDate(dateStr: string, format: string): Date {
        let formats: string[] = DateParser.parseFormatToArray(format);
        let values: number[];
        let ampm: string;
        [values, ampm] = DateParser.parseIntsFromString(dateStr);
        let date = new Date('2000-01-01 00:00');
        if (formats.length !== values.length) {
            return null;
        }
        values.forEach((value: number, index: number) => {
            if (formats[index] === 'H' && ampm) {
                if (ampm === 'AM' && value === 12) {
                    value = 0;
                } else if (ampm === 'PM' && value != 12) {
                    value += 12;
                }
            }
            DateParser.parseMap[formats[index]] ? DateParser.parseMap[formats[index]](date, value) : undefined;
        });
        return date;
    }

    private static parseFormatToArray(format: string): string[] {
        let values: string[] = [];
        let pattern: string = undefined;
        for(let i = 0; i < format.length; i++) {
            const char: string = format.charAt(i);
            if (!pattern) pattern = char;
            else if (pattern.length && pattern.charAt(0) === char) pattern += char;
            else {
                if (DateParser.parseMap[pattern.charAt(0)]) {
                    values.push(pattern.charAt(0));
                }
                pattern = char;
            }
        }
        if (DateParser.parseMap[pattern.charAt(0)]) {
            values.push(pattern.charAt(0));
        }
        return values;
    }

    private static parseIntsFromString(dateStr: string): any[] {
        let values: number[] = [];
        let ampm: string;
        let regex: RegExp = /(\d+|pm|am)/gi
        let match: any;
        while ((match = regex.exec(dateStr)) !== null) {
            if (match[0].toUpperCase() === 'PM' || match[0].toUpperCase() === 'AM') {
                ampm = match[0].toUpperCase();
            } else {
                values.push(parseInt(match[0]));
            }
        }
        return [values, ampm];
    }
}