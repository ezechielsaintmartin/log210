import {Question} from "../models/Question";
import {TruthFalseExpectedAnswer} from "./TruthFalseExpectedAnswer";
import {ExpectedAnswer} from "./ExpectedAnswer";
import {EssayExpectedAnswer} from "./EssayExpectedAnswer";
import {NumericExpectedAnswer} from "./NumericExpectedAnswer";
import {ShortExpectedAnswer} from "./ShortExpectedAnswer";

export class ExpectedAnswerFactory {
    public static createExpectedAnswer(question: Question, value: any): ExpectedAnswer {
        const type = question.type;
        let expectedAnswer: ExpectedAnswer;
        if (type == "truth-radio") {
            expectedAnswer = new TruthFalseExpectedAnswer(value);
        } else if (type == "numeric-radio") {
            expectedAnswer = new NumericExpectedAnswer(value);
        } else if (type == "short-radio") {
            expectedAnswer = new ShortExpectedAnswer(value);
        } else if (type == "essay-radio") {
            expectedAnswer = new EssayExpectedAnswer(value);
        }
        return expectedAnswer;
    }
}