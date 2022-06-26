import type {StudentModel} from "../model/student.model";
import Papa from 'papaparse';
export class CsvUtils {
    public static exportToCSV(students: StudentModel[], withHours= false, withDates=false): string {
        const csvData = students.map((s)=> {
            const missedDays = s.getMissedDaysAndHoursByType();
            const data = {
                "Vorname": s.firstName,
                "Nachname": s.name,
                "Tage entschuldigt": missedDays.excusedDays,
                "Tage unentschuldigt": missedDays.unexcusedDays
            };
            if(withHours) {
                data["Stunden entschuldigt"] = missedDays.excusedHours;
                data["Stunden unentschuldigt"] = missedDays.unexcusedHours;
            }
            if(withDates) {
                const dateFormatter = new Intl.DateTimeFormat("de");
                data["Fehldaten"] = Array.from(s.missedTimes.values()).map((v)=>dateFormatter.format(v.date)).join(", ");
            }
            return data;
        });
        return Papa.unparse(csvData, {
            header: true,
        });
    }

    public static importStudents(): StudentModel[] {
        return [];
    }
}
