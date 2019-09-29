import { Router, Request, Response, NextFunction } from 'express';

import { CourseController } from '../core/CourseController';
import {Course} from "../models/Course";
export class CourseRouter {
    router: Router;
    controller: CourseController;  // GRASP controller

    /**
     * Initialize the Router
     */
    constructor() {
        this.controller = new CourseController();  // init GRASP controller
        this.router = Router();
        this.init();
    }

    public getCourses(req: Request, res: Response, next: NextFunction) {
        req['courses'] = this.controller.getCourses();
        next();
    }

    public getCourse(req: Request, res: Response, next: NextFunction) {
        req['course'] = this.controller.getCourse(parseInt(req.params['id']));
        console.log(req['course']);
        next();
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {

    }

}

// exporter its configured Express.Router
export const courseRoutes = new CourseRouter();
courseRoutes.init();
