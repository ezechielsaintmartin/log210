import {ExpectedAnswer} from "./ExpectedAnswer";

export class TruthFalseExpectedAnswer extends ExpectedAnswer{
    private _truthValue: boolean;

    get value(): boolean {
        return this._truthValue;
    }

    set value(value: boolean) {
        this._truthValue = value;
    }

    constructor(truthValue: boolean) {
        super();
        this._truthValue = truthValue;
    }
}