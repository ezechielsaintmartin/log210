export class Course {
    private readonly _teacherId: number;
    private _id: number;
    private _sigle: string;
    private _maxNumberOfStudents: number;
    private _group: string;
    private _title: string;
    private _startDate: string;
    private _endDate: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get teacherId(): number {
        return this._teacherId;
    }

    get sigle(): string {
        return this._sigle;
    }

    set sigle(value: string) {
        this._sigle = value;
    }

    get maxNumberOfStudents(): number {
        return this._maxNumberOfStudents;
    }

    set maxNumberOfStudents(value: number) {
        this._maxNumberOfStudents = value;
    }

    get group(): string {
        return this._group;
    }

    set group(value: string) {
        this._group = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get startDate(): string {
        return this._startDate;
    }

    set startDate(value: string) {
        this._startDate = value;
    }

    get endDate(): string {
        return this._endDate;
    }

    set endDate(value: string) {
        this._endDate = value;
    }


    constructor(id: number, teacherId: number, sigle: string, maxNumberOfStudents: number, group: string, title: string, startDate: string, endDate: string) {
        this._id = id;
        this._teacherId = teacherId;
        this._sigle = sigle;
        this._maxNumberOfStudents = maxNumberOfStudents;
        this._group = group;
        this._title = title;
        this._startDate = startDate;
        this._endDate = endDate;
    }
}
