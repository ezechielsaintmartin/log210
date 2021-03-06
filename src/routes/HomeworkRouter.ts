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

    public deleteHomework(req: Request, res: Response, next: NextFunction) {
        let id = parseInt(req.params.id);
        let courseId = this.controller.deleteHomework(id);
        res.redirect('/course/' + courseId + '/homeworks');
    }
    public async getHomeworkById(req:Request, res:Response, next: NextFunction){
        req['homework'] = await this.controller.getHomeworkById(parseInt(req.params.homeWorkID));
        next();
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

    public editHomework(req: Request, res: Response, next: NextFunction) {
        let courseId: number = parseInt(req.body.courseId);
        let id: number = parseInt(req.body.id);
        try {
            let description: string = req.body.description;
            let maxGrade: number = parseInt(req.body.maxGrade);
            let startDate: string = req.body.startDate;
            let endDate: string = req.body.endDate;
            let state: boolean = !!req.body.state;

            let homework = new Homework(id, courseId, description, maxGrade, startDate, endDate, state);

            this.controller.editHomework(homework);

        } catch (error) {
        }
        res.redirect('/course/' + courseId + '/homework/' + id);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {
        this.router.post('/', this.addHomework.bind(this));
        this.router.delete('/:id', this.deleteHomework.bind(this));
        this.router.put('/:id', this.editHomework.bind(this));
    }

}

// exporter its configured Express.Router
export const homeworkRoutes = new HomeworkRouter();
homeworkRoutes.init();
