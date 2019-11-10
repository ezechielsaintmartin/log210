export class Evaluation {
    private _quizId: number;
    private _studentId: number;
    private _grade: number;

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

    get grade(): number {
        return this._grade;
    }

    set grade(value: number) {
        this._grade = value;
    }

    constructor(quizId: number, studentId: number, grade: number) {
        this._quizId = quizId;
        this._studentId = studentId;
        this._grade = grade;

    }
}
