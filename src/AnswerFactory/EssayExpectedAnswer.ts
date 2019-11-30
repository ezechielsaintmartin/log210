import {ExpectedAnswer} from "./ExpectedAnswer";

export class EssayExpectedAnswer extends ExpectedAnswer{
    private _essayValue: string;

    get value(): string {
        return this._essayValue;
    }

    set value(value: string) {
        this._essayValue = value;
    }

    constructor(essayValue: string) {
        super();
        this._essayValue = essayValue;
    }
}