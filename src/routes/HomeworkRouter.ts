import { Router, Request, Response, NextFunction } from 'express';
import {HomeworkController} from "../core/HomeworkController";
import {Quiz} from "../models/Quiz";
import {Homework} from "../models/Homework";

export class HomeworkRouter {
    router: Router;
    controller: HomeworkController;  // GRASP controller

    /**
     * Initialize the Router
     */
    constructor() {
        this.controller = new HomeworkController();  // init GRASP controller
        this.router = Router();
        this.init();
    }

    public getHomeworkCountByCourse(req: Request, res: Response, next: NextFunction) {
        req['homeworkCountByCourse'] = this.controller.getHomeworkCountByCourse();
        next();
    }

    public getHomeworksByCourseId(req: Request, res: Response, next: NextFunction) {
        req['homeworks'] = this.controller.getHomeworksByCourseId(parseInt(req.params.id));
        next();
    }

    public getHomeworkById(req:Request, res:Response, next: NextFunction){
        req['homework'] = this.controller.getHomeworkById(parseInt(req.params.id));
    }

    public addHomework(req: Request, res: Response, next: NextFunction) {
        let courseId: number = parseInt(req.body.courseId);
        try {
            let description: string = req.body.description;
            let maxGrade: number = parseInt(req.body.maxGrade);
            let startDate: string = req.body.startDate;
            let endDate: string = req.body.endDate;
            let state: boolean = !!req.body.state;

            if (new Date(startDate) > new Date(endDate))
                throw new Error();

            let homework = new Homework(-1, courseId, description, maxGrade, startDate, endDate, state);

            this.controller.addHomework(homework);

            res.redirect('/course/' + courseId + '/homeworks/');
        } catch (error) {
            res.redirect('/course/' + courseId + '/homeworks/add?error=true');
        }
    }


    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {
        this.router.post('/', this.addHomework.bind(this));
    }

}

// exporter its configured Express.Router
export const homeworkRoutes = new HomeworkRouter();
homeworkRoutes.init();
