import type {SchoolYear} from "./school-year.model";
import type {StudentModel} from "./student.model";
import {SchoolYearUtils} from "../utils/school-year.utils";

export interface YearDataProperties{
    schoolYear?: SchoolYear;
    className: string;
    students?: StudentModel[];
}

export class YearData implements YearDataProperties {
    public className: string;
    public schoolYear: SchoolYear;
    public students: StudentModel[];

    constructor(properties: YearDataProperties) {
        this.students = properties.students ?? [];
        this.schoolYear = properties.schoolYear ?? SchoolYearUtils.generateCurrentSchoolYear();
        this.className = properties.className;
    }

}
