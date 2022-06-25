import {SchoolYear} from "../model/school-year.model";

export class SchoolYearUtils {

    public static readonly START_DAY = 1;
    public static readonly START_MONTH = 8;
    public static readonly END_DAY = 31;
    public static readonly END_MONTH = 7;

    public static generateCurrentSchoolYear(): SchoolYear {
        const switchDate = new Date();
        const currentDate = new Date();
        switchDate.setMonth(this.START_MONTH, this.START_DAY);
        let startYear: number, endYear: number;
        if (currentDate >= switchDate) {
            startYear = currentDate.getFullYear();
            endYear = currentDate.getFullYear() + 1;
        } else {
            startYear = currentDate.getFullYear() - 1;
            endYear = currentDate.getFullYear();
        }

        const startDate = new Date(), endDate = new Date();
        startDate.setFullYear(startYear, this.START_MONTH, this.START_DAY);
        endDate.setFullYear(endYear, this.END_MONTH, this.END_DAY);
        return new SchoolYear({
            startDate,
            endDate,
        });
    }
}
