import {Question} from "../models/Question"
import {Strings} from "../strings";

export class QuestionController {
    // GRASP controller class

    maxId: number;
    questions: Map<number, Question>;

    constructor() {
        this.maxId = 0;
        let questionArray: Question[] = require("./data/questions.json");
        this.questions = questionArray.reduce((map, obj) => {
            if (obj.id > this.maxId) {
                this.maxId = obj.id;
            }
            map[obj.id] = obj;
            return map;
        },new Map())
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

    public createQuestion(question: Question) {
        if (this.getQuestionByName(question.name) != null){
            throw Error(Strings.QUESTION_ALREADY_EXISTS);
        } else {
            ++this.maxId;
            question.id = this.maxId;
            this.questions.set(question.id, question);
        }
    }

    public updateQuestion(question: Question) {
        let questionWithName: Question = this.getQuestionByName(question.name);
        if (this.questions.has(question.id)){
            if (questionWithName == null || questionWithName.id == question.id){
                this.questions.set(question.id, question);
            } else {
                throw Error(Strings.QUESTION_ALREADY_EXISTS);
            }
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

    public getQuestionsByTeacher(teacherId: number): Question[] {
        return Array.from(this.questions.values()).filter(question => question.teacherId == teacherId);
    }

    public getQuestionsByCourse(courseId: number): Question[] {
        return Array.from(this.questions.values()).filter(question => question.courseId == courseId);
    }

    public getQuestion(questionId: number): Question {
        if (this.questions.has(questionId)){
            return this.questions.get(questionId);
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

    private getQuestionByName(name: string): Question {
        return Array.from(this.questions.values()).find(question => question.name == name);
    }

}
