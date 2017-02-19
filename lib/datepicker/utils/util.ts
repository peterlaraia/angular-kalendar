export class DateUtils {
 static buildCalendar(month: number, year: number): Date[][] {
    let calendar: any[] = []; //2d array of ints
    let date: Date = new Date(year, month, 1);
    //walk it back if Sunday is not the first of the month
    while(date.getDay() > 0) {
      date.setDate(date.getDate() - 1);
    }
    
    /*
    * Fill in the calendar
    */
    do {
      let week: Date[] = [];
      for(let dow = 0; dow < 7; dow++) {
        week.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        date.setDate(date.getDate() + 1);
      }
      calendar.push(week);
    } while (date.getMonth() === month);
    return calendar;
  }

  static buildDecade(year: number): number[] {
    return DateUtils.buildYearsByStepSize(year, 1);
  }

  static buildCentury(year: number): number[] {
    return DateUtils.buildYearsByStepSize(year, 10);
  }

  static buildYearsByStepSize(year: number, stepSize: number) {
    let list: number[] = [];
    year = year - (year % (10*stepSize));
    do {
      list.push(year);
      year += stepSize;
    } while (year % (10*stepSize) !== 0);
    return list;
  }

  static hoursTo24(hours: number, pm: boolean): number {
    if (pm) {
      if (hours < 12) return hours + 12;
    } else {
      if (hours === 12) return 0;
    }
    return hours;
  }

  static hoursTo12(hours: number): any[] {
    if (hours === 0) {
      return [12, 'AM'];
    }
    return [hours > 12 ? hours - 12 : hours, hours >= 12 ? 'PM' : 'AM'];
  }

  static isDate(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }
}

