import {Question} from "../models/Question"
import {Strings} from "../strings";
import {ExpectedAnswerFactory} from "../AnswerFactory/ExpectedAnswerFactory";

export class QuestionController {
    // GRASP controller class
    private static instance : QuestionController
    maxId: number;
    questions: {[id:number]: Question};

    private constructor() {
        this.maxId = 0;
        let questionArray: Question[] = require("../data/questions.json").map(obj => new Question(
            obj.id,
            obj.teacherId,
            obj.courseId,
            obj.name,
            obj.tags,
            obj.statement,
            obj.type,
            obj.expectedAnswer,
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

    public static getInstance() {
        if (QuestionController.instance == null) {
            QuestionController.instance = new QuestionController();
        }
        return QuestionController.instance;
    }

    /**
     *  system operations
     */

    public deleteQuestion(questionId: number) {
        if (this.questions[questionId]){
            delete this.questions[questionId];
        } else {
            throw Error(Strings.NO_SUCH_QUESTION_ID);
        }
    }

    public createQuestion(question: Question, value: any) {
        if (this.getQuestionByName(question.name) != null){
            throw Error(Strings.QUESTION_ALREADY_EXISTS);
        } else {
            question.expectedAnswer = ExpectedAnswerFactory.createExpectedAnswer(question, value);
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
                console.log("update value: " + question.expectedAnswer.value);
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
        console.log(this.questions)
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

    public getQuestions(questionIds: number[]): {questions: Question[], selected: {[id: number]: boolean}}{
        let result = {
            questions: [],
            selected: {}
        };
        for(let key in this.questions){
            result.questions.push(this.questions[key]);
        }
        questionIds.forEach(questionId => {
            if (isFinite(questionId))
                result.selected[questionId] = true;
        });
        return result;
    }

}
