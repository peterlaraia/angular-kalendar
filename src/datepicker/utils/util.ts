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
}

