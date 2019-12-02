import {ExpectedAnswer} from "./ExpectedAnswer";

export class ShortExpectedAnswer extends ExpectedAnswer{
    private _shortAnswer: string;

    get value(): string {
        return this._shortAnswer;
    }

    set value(value: string) {
        this._shortAnswer = value;
    }

    constructor(shortAnswer: string) {
        super();
        this._shortAnswer = shortAnswer;
    }
}