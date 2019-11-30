import {ExpectedAnswer} from "./ExpectedAnswer";

export class NumericExpectedAnswer extends ExpectedAnswer{
    private _numericValue: number;

    get value(): number {
        return this._numericValue;
    }

    set value(value: number) {
        this._numericValue = value;
    }

    constructor(numericValue: number) {
        super();
        this._numericValue = numericValue;
    }
}