export class Homework {
    private _id: number;
    private _courseId: number;
    private _description: string;
    private _maxGrade: number;
    private _startDate: string;
    private _endDate: string;
    private _state: boolean;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get courseId(): number {
        return this._courseId;
    }

    set courseId(value: number) {
        this._courseId = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get maxGrade(): number {
        return this._maxGrade;
    }

    set maxGrade(value: number) {
        this._maxGrade = value;
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

    get state(): boolean {
        return this._state;
    }

    set state(value: boolean) {
        this._state = value;
    }


    constructor(id: number, courseId: number, description: string, maxGrade: number, startDate: string, endDate: string, state: boolean) {
        this._id = id;
        this._courseId = courseId;
        this._description = description;
        this._maxGrade = maxGrade;
        this._startDate = startDate;
        this._endDate = endDate;
        this._state = state;
    }
}
