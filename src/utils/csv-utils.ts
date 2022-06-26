import {StudentModel} from "../model/student.model";
import Papa, {ParseResult} from 'papaparse';
import * as chardet from 'chardet';
export class CsvUtils {
    public static exportToCSV(students: StudentModel[], withHours= false, withDates=false): string {
        const csvData = students.map((s)=> {
            const missedDays = s.getMissedDaysAndHoursByType(withHours);
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
            delimiter: ";"
        });
    }

    public static async importStudents(csvFile: File): Promise<StudentModel[]> {
        const encodingPromise = new Promise<string>((resolve)=> {
            const fileReader = new FileReader();
            let encoding;
            fileReader.onload = (e)=> {
                encoding = chardet.detect(new Uint8Array(e.target.result as ArrayBuffer));
                resolve(encoding);
            };
            fileReader.readAsArrayBuffer(csvFile);
        });
        const encoding = await encodingPromise;
        console.log("Encoding:",encoding);
        const promise = new Promise<ParseResult<any>>((resolve)=> {
            Papa.parse(csvFile as any, {header: true, encoding:encoding, skipEmptyLines: true, complete: (res)=>resolve(res)});
        });
        const res = await promise;
        return res.data.map((row)=> {
            const keys = Object.keys(row);
            const firstNameKey = keys.find((key)=>key?.toLocaleLowerCase() === "vorname");
            const lastNameKey = keys.find((key)=>key?.toLocaleLowerCase() === "name");
            return StudentModel.fromJSON({
                firstName: row[firstNameKey],
                name: row[lastNameKey]
            });
        });
    }
}
