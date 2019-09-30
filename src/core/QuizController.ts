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
}
