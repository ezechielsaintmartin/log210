import {Quiz} from "../models/Quiz"
import {Strings} from "../strings";

export class QuizController {
    // GRASP controller class

    maxId: number;
    quizzes: { [id: number]: Quiz };

    constructor() {
        this.maxId = 0;
        this.quizzes = {};
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
}
