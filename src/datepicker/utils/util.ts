export class DateUtils {
 static buildCalendar(month: number, year: number): Date[][] {
    let calendar: any[] = []; //2d array of ints
    let date: Date = new Date(year, month, 1);
    //walk it back
    date.setDate(date.getDate() - 1);
    while(date.getDay() > 0) {
      date.setDate(date.getDate() - 1);
    }
    /*
    * Fill in the calendar
    * Will always be 6 weeks, we want to show at least 1 day from
    * prev & next month
    */
    for(let wk = 0; wk < 6; wk++) {
      let week: Date[] = [];
      for(let dow = 0; dow < 7; dow++) {
        week.push(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
        date.setDate(date.getDate() + 1);
      }
      calendar.push(week);
    }
    return calendar;
  }
}

