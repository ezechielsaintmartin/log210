import {Question} from "../models/Question"
import {Strings} from "../strings";

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
        if (this.questions.has(questionId)){
            this.questions.delete(questionId);
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

}
