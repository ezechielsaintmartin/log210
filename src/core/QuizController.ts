import {Quiz} from "../models/Quiz";
import { Question } from "../models/Question";
import { QuestionController } from "./QuestionController";
import { SGB } from "../third-party/SGB";
import {CourseController} from "./CourseController";
import {Student} from "../models/Student";

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

        for(let i = 0; i < quizIDs.length; ++i) {
            let quizId = quizIDs[i];
            const quiz = this.quizzes[quizId];
            const idCoursQuiz = quiz.courseId;
            console.log("after");

            if (idCoursQuiz == courseId) {
                outQuizzes.push(quiz);

                let grades = await this.sgb.getGradesForStudent();
                if(grades[quizId] != null) {
                    outGrades[quizId] = grades[quizId];
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

    public addAnswer(quizId: number, question: Question, studentId: number, value: boolean): void {
        const quiz = this.quizzes[quizId];
        quiz.addAnswer(question, studentId, value);
    }

    public async answerQuestion(quizId: number, question: Question, studentId: number, value: boolean) : Promise<Question> {
        this.addAnswer(quizId, question, studentId, value);
        const nextQuestion = this.quizzes[quizId].getFirstUnansweredQuestion(studentId);
        if (!nextQuestion){
            await this.finishQuiz(quizId, studentId);
        }
        return nextQuestion;
    }

    public async finishQuiz(quizId: number, studentId: number) : Promise<number> {
        const quiz = this.getQuiz(quizId);
        const grade =  quiz.calculateGradeForStudent(studentId);

        await this.sgb.addGradeForQuiz(quizId, quiz.courseId, grade);

        return grade;
    }

    public async getGradesByCourse(quizId: number): Promise<{student: Student, grade: number}[]>{
        const quiz: Quiz = this.getQuiz(quizId);
        const courseId: number = quiz.courseId;
        let grades = await this.sgb.getGrades(courseId);
        let students = await CourseController.getInstance().getStudentsFromCourse(courseId);
        let outGrades: {student: Student, grade: number}[] = [];
        for(let i = 0; i < students.length; ++i){
            let student = students[i];
            let quizzesByStudent = grades[student.id];
            if (quizzesByStudent && quizzesByStudent[quizId] != null){
                outGrades.push({student: student, grade: quizzesByStudent[quizId]});
            }
        }
        return outGrades;
    }

    public async getGrades(courseId: number): Promise<{[quizId: number]: {student: Student, grade: number}[]}>{
        let grades = await this.sgb.getGrades(courseId);
        let students = await CourseController.getInstance().getStudentsFromCourse(courseId);
        let outGrades: {[quizId: number]: {student: Student, grade: number}[]} = {};
        for(let i = 0; i < students.length; ++i){
            let student = students[i];
            let quizzesByStudent = grades[student.id];
            if (quizzesByStudent){
                let quizzes = Object.keys(quizzesByStudent);
                for (let j = 0; j < quizzes.length; ++j){
                    let quiz = quizzes[j];
                    if (!outGrades[quiz]){
                        outGrades[quiz] = [];
                    }
                    outGrades[quiz].push({student: student, grade: quizzesByStudent[quiz]});
                }
            }
        }
        return outGrades;
    }

}
