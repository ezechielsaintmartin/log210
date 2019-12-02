import {ExpectedAnswer} from "../AnswerFactory/ExpectedAnswer";

export class Question{
    private _id: number;
    private readonly _teacherId: number;
    private readonly _courseId: number;
    private _name: string;
    private _tags: string[];
    private _statement: string;
    private _type: string;
    private _expectedAnswer: ExpectedAnswer;
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

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
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

    get expectedAnswer(): ExpectedAnswer {
        return this._expectedAnswer;
    }

    set expectedAnswer(value: ExpectedAnswer) {
        this._expectedAnswer = value;
    }

    constructor(id: number, teacherId: number, courseId: number, name: string, tags: string[], statement: string, type: string, expectedAnswer: any, successText: string, failureText: string) {
        this._id = id;
        this._teacherId = teacherId;
        this._courseId = courseId;
        this._name = name;
        this._tags = tags;
        this._statement = statement;
        this._type = type;
        this._expectedAnswer = expectedAnswer;
        this._successText = successText;
        this._failureText = failureText;
    }
}
