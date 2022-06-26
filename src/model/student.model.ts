import type {MissedTime} from "./missed-time.model";

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
        let days = 0;
        let hours = 0;
        this.missedTimes.forEach((value, key)=> {
            if(value.hours === 0) {
                days += 1;
            } else {
                hours += value.hours;
            }
            if(hours >= 6) {
                days += 1;
                hours -= 6;
            }
        });
        return [days, hours];
    }

}
