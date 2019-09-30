export class Quiz {
    private _id: number;
    private _description: string;
    private _active: boolean;
    private _courseId: number;
    private _questions: number[];

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }

    get courseId(): number {
        return this._courseId;
    }

    set courseId(value: number) {
        this._courseId = value;
    }

    get questions(): number[] {
        return this._questions;
    }

    set questions(value: number[]) {
        this._questions = value;
    }

    constructor(id: number, description: string, active: boolean, courseId: number, questions: number[]) {
        this._id = id;
        this._description = description;
        this._active = active;
        this._courseId = courseId;
        this._questions = questions;
    }
}
