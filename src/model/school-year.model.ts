export interface SchoolYearProperties {
    startDate: Date;
    endDate: Date;
}

export class SchoolYear implements SchoolYearProperties {

    public endDate: Date;
    public startDate: Date;

    get name(): string {
        if(!this.startDate || !this.endDate) {
            return null;
        }
        return `${this.startDate.getFullYear()}/${this.endDate.getFullYear()}`;
    }
    constructor(properties: SchoolYearProperties) {
        Object.assign(this, properties);
    }

    public static fromJSON(json: any): SchoolYear {
        return new SchoolYear({
            endDate: new Date(json.endDate),
            startDate: new Date(json.startDate)
        });
    }


}
