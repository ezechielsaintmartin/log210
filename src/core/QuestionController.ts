import {Question} from "../models/Question"

export class QuestionController {
    // GRASP controller class

    questions: Map<number, Question>;

    constructor() {
        this.questions = new Map();
        this.questions.set(1, new Question(1, "Question 1"));
        this.questions.set(2, new Question(2, "Question 2"));
    }

    /**
     *  system operatiosn
     */

    public deleteQuestion(questionId: number) {
        this.questions.delete(questionId);
    }

}
