export interface MissedTime {
    date: Date;
    type: MissedType
    hours: number;
}

export enum MissedType {
    EXCUSED="Entschuldigt",
    UNEXCUSED="Unentschuldigt"
}
