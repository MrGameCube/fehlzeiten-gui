import type {MissedTime} from "./missed-time.model";
import {MissedType} from "./missed-time.model";

export interface StudentProperties {
    firstName: string;
    name: string;
    missedTimes?: Map<string, MissedTime>;
}

export class StudentModel implements StudentProperties {

    public firstName: string;
    // Map from ISO-Date to Missed Time
    public missedTimes: Map<string, MissedTime>;
    public name: string;


    constructor(properties: StudentProperties) {
        this.name = properties.name;
        this.firstName = properties.firstName;
        this.missedTimes = properties.missedTimes ?? new Map<string, MissedTime>();
    }

    public toJSON(): any {
        return {
          firstName: this.firstName,
          name: this.name,
          missedTimes: this.missedTimes ? [...this.missedTimes] : [],
        };
    }

    public static fromJSON(json: any): StudentModel {
        const map = new Map<string, MissedTime>(json.missedTimes);
        map.forEach((value, key)=>value.date = new Date(value.date));
        return new StudentModel(
            {
                firstName: json.firstName,
                name: json.name,
                missedTimes: map
            }
        );
    }

    public getMissedDays(): number {
        return this.getMissedDaysAndHours()[0];
    }

    public getMissedDaysAndHours(): [number, number] {
        const count = this.getMissedDaysAndHoursByType();
        let days = count.unexcusedDays + count.excusedDays;
        let hours = count.unexcusedHours + count.excusedHours;
        if(hours >= 6) {
            days += 1;
            hours -= 6;
        }
        return [days, hours];
    }

    public getMissedDaysAndHoursByType(): {unexcusedDays: number, unexcusedHours: number, excusedDays: number, excusedHours: number} {
        let excusedDays = 0;
        let unexcusedDays = 0;
        let excusedHours = 0;
        let unexcusedHours = 0;
        this.missedTimes.forEach((value, key)=> {
            if(value.hours === 0) {
                if(value.type === MissedType.EXCUSED) {
                    excusedDays += 1;
                } else {
                    unexcusedDays += 1;
                }
            } else {
                if(value.type === MissedType.EXCUSED) {
                    excusedHours += value.hours;
                } else {
                    unexcusedHours += value.hours;
                }
            }
            if(unexcusedHours >= 6) {
                unexcusedDays += 1;
                unexcusedHours -= 6;
            }
            if(excusedHours >= 6) {
                excusedDays += 1;
                excusedHours -= 6;
            }
        });
        return {
            excusedDays,
            excusedHours,
            unexcusedHours,
            unexcusedDays
        };
    }

}
