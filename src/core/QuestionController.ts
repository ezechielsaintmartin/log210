import {Question} from "../models/Question"
import {Strings} from "../strings";

export class QuestionController {
    // GRASP controller class

    maxId: number;
    questions: {[id:number]: Question};

    constructor() {
        this.maxId = 0;
        let questionArray: Question[] = require("../data/questions.json").map(obj => new Question(
            obj.id,
            obj.teacherId,
            obj.courseId,
            obj.name,
            obj.tags,
            obj.statement,
            obj.truth,
            obj.successText,
            obj.failureText
        ));
        this.questions = questionArray.reduce((map, obj) => {
            if (obj.id > this.maxId) {
                this.maxId = obj.id;
            }
            map[obj.id] = obj;
            return map;
        },{});
    }

    /**
     *  system operatiosn
     */

    public deleteQuestion(questionId: number) {
        if (this.questions[questionId]){
            delete this.questions[questionId];
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
            this.questions[question.id] = question;
        }
    }

    public updateQuestion(question: Question) {
        let questionWithName: Question = this.getQuestionByName(question.name);
        if (this.questions[question.id]){
            if (questionWithName == null || questionWithName.id == question.id){
                this.questions[question.id] = question;
            } else {
                throw Error(Strings.QUESTION_ALREADY_EXISTS);
            }
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

    public getQuestionsByTeacher(teacherId: number): Question[] {
        let questions = [];
        for (let key in this.questions){
            //if (this.questions[key].teacherId == teacherId) Pour l'instant, on ignore l'id de l'enseignant
                questions.push(this.questions[key]);
        }
        return questions;
    }

    public getQuestionsByCourse(courseId: number): Question[] {
        let questions = [];
        for (let key in this.questions){
            if (this.questions[key].courseId == courseId)
                questions.push(this.questions[key]);
        }
        return questions;
    }

    public getQuestion(questionId: number): Question {
        if (this.questions[questionId]){
            return this.questions[questionId];
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

    private getQuestionByName(name: string): Question {
        for (let key in this.questions){
            if (this.questions[key].name == name)
                return this.questions[key];
        }
        return null;
    }

    public getTags(): string[] {
        let tags = [];
        for (let key in this.questions){
            tags.push(...this.questions[key].tags);
        }
        return [...new Set(tags)];
    }

    public getQuestionsByTag(courseId: number, tag: string): Question[]{
        let questions: Question[] = [];
        for (let key in this.questions){
            let question = this.questions[key];
            if (question.courseId == courseId && question.tags.filter(value => value == tag).length)
                questions.push(question);
        }
        return questions;
    }

}
