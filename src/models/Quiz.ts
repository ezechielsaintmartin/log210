import { Answer } from "./Answer";
import { Question } from "./Question";
import { QuestionController } from "../core/QuestionController";

export class Quiz {
    private _id: number;
    private _description: string;
    private _active: boolean;
    private _courseId: number;
    private _questions: number[];
    private _answersByQuestionId : {[id: number]: Answer[]} = {};

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

    public getAnswerByQuestionId(questionId: number): Answer[] {
        return this._answersByQuestionId[questionId];
    }

    set answers(value: {[id: number]: Answer[]}) {
        this._answersByQuestionId = value;
    }

    public getFirstUnansweredQuestion(studentId: number) : Question {
        let question = null;
        console.log(this.questions);
        for (let i = 0; i < this._questions.length; ++i){
            let answered = false;
            let questionId = this._questions[i];
            const answers = this._answersByQuestionId[questionId];
            if (answers){
                answers.forEach((answer) =>
                    {
                        if (studentId == answer.studentId) {
                            answered = true;
                        }
                    }
                );
            }
            if (answered == false) {
                let questionController = QuestionController.getInstance();
                question = questionController.getQuestion(questionId);
                return question;
            }
        }
        return null;
    }

    public addAnswer(question: Question, studentId: number, value: any) : void {
        let answer = new Answer(this.id, studentId, question, value);
        const questionId = question.id;

        if ((this._answersByQuestionId[questionId]) == null) {
            this._answersByQuestionId[questionId] = [];
        }

        this.getAnswerByQuestionId(questionId).push(answer);

    }

    public calculateGradeForStudent(studentId: number): number{
        let total = 0;
        let correct = 0;
        for (let i = 0; i < this._questions.length; ++i) {
            const answers = this.getAnswerByQuestionId(this._questions[i]);
            answers.forEach((answer) =>
                {
                    if (studentId == answer.studentId) {
                        total++;
                        if (answer.success) {
                            correct++;
                        }
                    }
                }
            );
        }
        let grade = (correct / total) * 100;

        return grade;

    }

    constructor(id: number, description: string, active: boolean, courseId: number, questions: number[],
         answerByQuestionId: {[id: number]: Answer[]}) {
        this._id = id;
        this._description = description;
        this._active = active;
        this._courseId = courseId;
        this._questions = questions;
        this._answersByQuestionId = answerByQuestionId;
    }
}
