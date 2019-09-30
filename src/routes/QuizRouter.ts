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

    public getQuizzesByCourse(req: Request, res: Response, next: NextFunction) {
        let courseId: number = parseInt(req.params.id);
        req['quizzes'] = this.controller.getQuizzesByCourse(courseId);
        next();
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {
        this.router.post('/', this.createQuiz.bind(this));
    }

}

// exporter its configured Express.Router
export const quizRoutes = new QuizRouter();
quizRoutes.init();
