import {Quiz} from "../models/Quiz";
import { Question } from "../models/Question";
import { QuestionController } from "./QuestionController";
import { SGB } from "../third-party/SGB";

export class QuizController {
    // GRASP controller class

    maxId: number;
    quizzes: { [id: number]: Quiz };
    sgb: SGB;

    constructor(sgb: SGB) {
        this.maxId = 0;
        this.quizzes = {};
        this.sgb = sgb;
    }

    /**
     *  system operatiosn
     */

    public getQuizCountByCourse(): {[courseId: number]: number} {
        let quizCountByCourse: {[courseId: number]: number} = {};
        for(let key in this.quizzes){
            let quiz = this.quizzes[key];
            if (quizCountByCourse[quiz.courseId]){
                ++quizCountByCourse[quiz.courseId];
            } else {
                quizCountByCourse[quiz.courseId] = 1;
            }
        }
        return quizCountByCourse;
    }

    public getQuizCountByQuestion(): {[courseId: number]: number} {
        let quizCountByQuestion: {[courseId: number]: number} = {};
        for(let key in this.quizzes){
            let quiz = this.quizzes[key];
            quiz.questions.forEach(question => {
                if (quizCountByQuestion[question]){
                    ++quizCountByQuestion[question];
                } else {
                    quizCountByQuestion[question] = 1;
                }
            });
        }
        return quizCountByQuestion;
    }

    public getQuizzesByCourse(courseId: number): Quiz[] {
        let quizzes: Quiz[] = [];
        for(let key in this.quizzes){
            let quiz = this.quizzes[key];
            if (quiz.courseId == courseId){
                quizzes.push(quiz);
            }
        }
        return quizzes;
    }

    public createQuiz(quiz: Quiz){
        ++this.maxId;
        quiz.id = this.maxId;
        this.quizzes[quiz.id] = quiz;
    }

    public getQuizzesByQuestion(questionId: number): Quiz[] {
        let quizzes: Quiz[] = [];
        for(let key in this.quizzes){
            let quiz = this.quizzes[key];
            quiz.questions.forEach((id) => {
                if (id == questionId)
                    quizzes.push(quiz);
            });
        }
        return quizzes;
    }

    public addQuestions(quizId: number, questions: number[]){
        this.quizzes[quizId].questions.push(...questions);
        return this.quizzes[quizId];
    }

    public getQuiz(quizId: number): Quiz {
        return this.quizzes[quizId];
    }

    public updateQuiz(quizId: number, description: string, active: boolean, body: any){
        this.quizzes[quizId].description = description;
        this.quizzes[quizId].active = active;
        let questions = [];
        for(let key in body){
            if (isFinite(Number(key)) && body[key] == 'on'){
                questions.push(parseInt(key));
            }
        }
        this.quizzes[quizId].questions = questions;
    }

    public deleteQuiz(quizId: number){
        let courseId = this.quizzes[quizId].courseId;
        delete this.quizzes[quizId];
        return courseId;
    }

    public async getQuizByCourse(courseId: number, studentId: number): 
     Promise<{quizzes: Quiz[], grades: {[id: number]: number}}> {
        let quizIDs = Object.keys(this.quizzes);
        let outQuizzes = [];
        let outGrades : {[id: number]: number} = {};
        let tuple: {quizzes: Quiz[], grades: {[id: number]: number}} = {quizzes: outQuizzes, grades : outGrades};
        
        for(let quizIDKey in quizIDs) {
            let quizID = parseInt(quizIDKey);
            const quiz = this.quizzes[quizID];
            console.log(this.quizzes);
            console.log(this.quizzes[1]);
            console.log("quiz id: " + quizID);
            console.log("quiz key: " + quizIDKey);
            const idCoursQuiz = this.quizzes[quizID].courseId;
            console.log("after");

            if (idCoursQuiz == courseId) {
                outQuizzes.push(quiz);

                let grades = await this.sgb.getGrades();
                if(grades[quizID] != null) {
                    outGrades[quizID] = grades[quizID];
                }
            }
        }
        return tuple;
    }

    public getQuestionByQuiz(quizId: number, studentId: number): Question {
        const quiz = this.quizzes[quizId];
        const question = quiz.getFirstUnansweredQuestion(studentId);

        return question;
    }

    public addAnswer(question: Question, studentId: number, value: boolean): void {
        const questionId = question.id;
        const quiz = this.quizzes[questionId];
        quiz.addAnswer(question, studentId, value);
    }

    public answerQuestion(question: Question, studentId: number, value: boolean) : Question {
        this.addAnswer(question, studentId, value);
        const questionId = question.id;

        return this.quizzes[questionId].getFirstUnansweredQuestion(studentId);
    }

    public finishQuiz(quizId: number, questionId, value: boolean, studentId: number) : number {
        const quiz = this.getQuiz(quizId);
        const questionController = QuestionController.getInstance();
        const question = questionController.getQuestion(questionId);
        this.addAnswer(question, studentId, value);
        
        return quiz.createEvaluation(studentId);
    }

}
