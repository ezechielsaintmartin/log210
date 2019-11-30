import { Question } from "./Question";

export class Answer {
    private _quizId: number;
    private _studentId: number;
    private _question: Question;
    private _success: boolean;

    get quizId(): number {
        return this._quizId;
    }

    set quizId(value: number) {
        this._quizId = value;
    }

    get studentId(): number {
        return this._studentId;
    }

    set studentId(value: number) {
        this._studentId = value;
    }

    get question(): Question {
        return this._question;
    }

    set question(value: Question) {
        this._question = value;
    }

    get success(): boolean {
        return this._success;
    }

    set success(value: boolean) {
        this._success = value;
    }

    constructor(quizId: number, studentId: number, question: Question, value: any) {
        this._quizId = quizId;
        this._studentId = studentId;
        this._question = question;
        const expectedValue = question.expectedAnswer;

        this._success = expectedValue == value;
    }
}
