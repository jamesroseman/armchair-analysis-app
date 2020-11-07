import { Day } from "../types/ModelConstantTypes";

export class TimeUtils {
  /**
   * Get the printable time string of a date string.
   */
  public static getPrintableTimeFromDate(
    dateStr: string,
  ): string {
    const rawTime: string = dateStr.split(" ")[1];
    const rawHour: number = parseInt(rawTime.split(":")[0]);
    const hour: number = rawHour <= 12 ? rawHour : rawHour - 12;
    const rawMinute: number = parseInt(rawTime.split(":")[1]);
    const minute: string = rawMinute > 0 && rawMinute > 10 
    ? `:${rawMinute}` 
    : rawMinute > 0
    ? `:0${rawMinute}`
    :"";
    const amPm: string = rawHour < 12 ? "a.m." : "p.m.";
    return `${hour}${minute}${amPm} Eastern`;
  }

  /**
   * Get the printable string of a Date and Day. ("Thursday, Nov. 9")
   */
  public static getPrintableDateFromDateAndDayOfWeek(
    dateStr: string,
    dayOfWeek: Day,
    includeYear: boolean = false
  ): string {
    const dayStr: string = TimeUtils.getPrintableDayFromDayOfWeek(dayOfWeek);
    const date: Date = new Date(dateStr);
    const monthStr: string = TimeUtils.getAbbrPrintableMonthFromDate(date);
    const yearStr: string = includeYear ? `, ${date.getFullYear()}` : "";
    return `${dayStr}, ${monthStr} ${date.getDate()}${yearStr}`;
  }

  /**
   * Get the printable string of a Day.
   */
  public static getPrintableDayFromDayOfWeek(day: Day): string {
    switch(day) {
      case Day.Monday: {
        return "Monday";
      }
      case Day.Tuesday: {
        return "Tuesday";
      }
      case Day.Saturday: {
        return "Saturday";
      }
      case Day.Sunday: {
        return "Sunday";
      }
      case Day.Thursday: {
        return "Thursday";
      }
      default: {
        return "UnknownDay";
      }
    }
  }

/**
   * Get the abbreviated printable month of a Date.
   */
  public static getAbbrPrintableMonthFromDate(date: Date): string {
    switch(date.getMonth() + 1) {
      case 1: {
        return "Jan.";
      }
      case 2: {
        return "Feb.";
      }
      case 3: {
        return "Mar.";
      }
      case 4: {
        return "April";
      }
      case 5: {
        return "May";
      }
      case 6: {
        return "June";
      }
      case 7: {
        return "July";
      }
      case 8: {
        return "Aug.";
      }
      case 9: {
        return "Sept.";
      }
      case 10: {
        return "Oct.";
      }
      case 11: {
        return "Nov.";
      }
      case 12: {
        return "Dec.";
      }
      default: {
        return "UnkownAbbrMonth";
      }
    }
  }

  /**
   * Get the printable month of a Date.
   */
  public static getPrintableMonthFromDate(date: Date): string {
    switch(date.getMonth() + 1) {
      case 1: {
        return "January";
      }
      case 2: {
        return "February";
      }
      case 3: {
        return "March";
      }
      case 4: {
        return "April";
      }
      case 5: {
        return "May";
      }
      case 6: {
        return "June";
      }
      case 7: {
        return "July";
      }
      case 8: {
        return "August";
      }
      case 9: {
        return "September";
      }
      case 10: {
        return "October";
      }
      case 11: {
        return "November";
      }
      case 12: {
        return "December";
      }
      default: {
        return "UnkownMonth";
      }
    }
  }
}