import {SchoolYear} from "./school-year.model";
import {StudentModel} from "./student.model";
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

    public static fromJSON(json: any): YearData {
        if(!json) {
            return null;
        }
        return new YearData({
            className: json.className,
            schoolYear: SchoolYear.fromJSON(json.schoolYear),
            students: json.students?.map((s)=>StudentModel.fromJSON(s))
        });
    }

}
