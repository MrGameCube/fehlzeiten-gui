export class DateUtils {
    public static getFirstDayOfWeek(date: Date): Date {
        const dateClone = this.cloneDateToMidnight(date);
        let dayOfWeek = dateClone.getDay();
        if(dayOfWeek === 0) {
            dayOfWeek = 7;
        }
        const offset = dayOfWeek - 1;
        dateClone.setDate(dateClone.getDate() - offset);
        return dateClone;
    }

    public static getLastDayOfWeek(date: Date): Date {
        const dateClone = this.cloneDateToMidnight(date);
        let dayOfWeek = dateClone.getDay();
        if(dayOfWeek === 0) {
            dayOfWeek = 7;
        }
        const offset = 5 - dayOfWeek;
        dateClone.setDate(dateClone.getDate() + offset);
        return dateClone;
    }

    public static cloneDateToMidnight(date: Date) {
        const dateClone = new Date(date);
        dateClone.setMinutes(0);
        dateClone.setSeconds(0);
        dateClone.setHours(0);
        dateClone.setMilliseconds(0);
        return dateClone;
    }

    // 0 is Monday!
    public static getISOForDay(date: Date, dayOfWeek: number): string {
        const firstDay = this.getFirstDayOfWeek(date);
        firstDay.setDate(firstDay.getDate() + dayOfWeek)
        return firstDay.toISOString();
    }
}
