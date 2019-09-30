export class Question{
    private _id: number;
    private readonly _teacherId: number;
    private readonly _courseId: number;
    private _name: string;
    private _tags: string[];
    private _statement: string;
    private _truth: boolean;
    private _successText: string;
    private _failureText: string;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get teacherId(): number {
        return this._teacherId;
    }

    get courseId(): number {
        return this._courseId;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string){
        this._name = name;
    }

    get tags(): string[] {
        return this._tags;
    }

    set tags(value: string[]) {
        this._tags = value;
    }

    get statement(): string {
        return this._statement;
    }

    set statement(value: string) {
        this._statement = value;
    }

    get truth(): boolean {
        return this._truth;
    }

    set truth(value: boolean) {
        this._truth = value;
    }

    get successText(): string {
        return this._successText;
    }

    set successText(value: string) {
        this._successText = value;
    }

    get failureText(): string {
        return this._failureText;
    }

    set failureText(value: string) {
        this._failureText = value;
    }

    constructor(id: number, teacherId: number, courseId: number, name: string, tags: string[], statement: string, truth: boolean, successText: string, failureText: string) {
        this._id = id;
        this._teacherId = teacherId;
        this._courseId = courseId;
        this._name = name;
        this._tags = tags;
        this._statement = statement;
        this._truth = truth;
        this._successText = successText;
        this._failureText = failureText;
    }
}
