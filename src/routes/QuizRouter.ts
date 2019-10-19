import { Router, Request, Response, NextFunction } from 'express';

import { QuizController } from '../core/QuizController';
import {Quiz} from "../models/Quiz";
import {Question} from "../models/Question";
export class QuizRouter {
    router: Router;
    controller: QuizController;  // GRASP controller

    /**
     * Initialize the Router
     */
    constructor() {
        this.controller = new QuizController();  // init GRASP controller
        this.router = Router();
        this.init();
    }

    public createQuiz(req: Request, res: Response, next: NextFunction) {
        try {
            let courseId: number = parseInt(req.body.courseId);
            let description: string = req.body.description;
            let active: boolean = !!req.body.active;

            let quiz = new Quiz(-1, description,active, courseId, []);

            this.controller.createQuiz(quiz);

            res.redirect('/course/' + courseId + '/quiz/' + quiz.id + '/tags');
        } catch (error) {
            res.sendStatus(400);
        }
    }

    public getQuizCountByCourse(req: Request, res: Response, next: NextFunction) {
        req['quizCountByCourse'] = this.controller.getQuizCountByCourse();
        next();
    }

    public getQuizCountByQuestion(req: Request, res: Response, next: NextFunction) {
        req['quizCountByQuestion'] = this.controller.getQuizCountByQuestion();
        next();
    }

    public getQuizzesByCourse(req: Request, res: Response, next: NextFunction) {
        let courseId: number = parseInt(req.params.id);
        req['quizzes'] = this.controller.getQuizzesByCourse(courseId);
        next();
    }

    public getQuiz(req: Request, res: Response, next: NextFunction) {
        let quizId: number = parseInt(req.params.id);
        req['quiz'] = this.controller.getQuiz(quizId);
        next();
    }

    public getQuizzesByQuestion(req: Request, res: Response, next: NextFunction) {
        let questionId: number = parseInt(req.params.id);
        req['quizzes'] = this.controller.getQuizzesByQuestion(questionId);
        next();
    }

    public addQuestions(req: Request, res: Response, next: NextFunction) {
        let quiz: Quiz = this.controller.addQuestions(parseInt(req.params.id), Object.keys(req.body).map(key => parseInt(key)));
        res.redirect('/course/' + quiz.courseId + '/quiz/' + quiz.id + '/tags');
    }

    public updateQuiz(req: Request, res: Response, next: NextFunction) {
        let description = req.body.description;
        let active = !!req.body.active;
        let id = parseInt(req.body.quizId);
        this.controller.updateQuiz(id, description, active, req.body);
        console.log("Quiz updated");
        res.redirect('/quiz/' + id);
    }

    public deleteQuiz(req: Request, res: Response, next: NextFunction) {
        let id = parseInt(req.params.id);
        let courseId = this.controller.deleteQuiz(id);
        res.redirect('/course/' + courseId + '/quizList');
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {
        this.router.post('/', this.createQuiz.bind(this));
        this.router.post('/:id/questions', this.addQuestions.bind(this));
        this.router.put('/:id', this.updateQuiz.bind(this));
        this.router.delete('/:id', this.deleteQuiz.bind(this));
    }

}

// exporter its configured Express.Router
export const quizRoutes = new QuizRouter();
quizRoutes.init();
