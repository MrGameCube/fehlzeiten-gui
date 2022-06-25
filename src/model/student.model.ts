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
        return new StudentModel(
            {
                firstName: json.firstName,
                name: json.name,
                missedTimes: new Map<string, MissedTime>(json.missedTimes)
            }
        );
    }

}
