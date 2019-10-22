import { Router, Request, Response, NextFunction } from 'express';

import { CourseController } from '../core/CourseController';
import {SGB} from "../third-party/SGB";
export class CourseRouter {
    router: Router;
    controller: CourseController;  // GRASP controller
    sgb: SGB;

    /**
     * Initialize the Router
     */
    constructor(sgb: SGB) {
        this.sgb = sgb;
        this.controller = new CourseController(sgb);  // init GRASP controller
        this.router = Router();
        this.init();
    }

    public async getCourses(req: Request, res: Response, next: NextFunction) : Promise<void>{
        req['courses'] = await this.controller.getCourses();
        next();
    }

    public async getCourse(req: Request, res: Response, next: NextFunction) : Promise<void>{
        req['course'] = await this.controller.getCourse(parseInt(req.params['id']));
        console.log(req['course']);
        next();
    }

    public async getStudentsForCourse(req: Request, res: Response, next: NextFunction) : Promise<void>{
        req['students'] = await this.controller.getStudentsFromCourse(parseInt(req.params.id));
        next();
    }

    public getCoursesByTeacher(req: Request, res: Response, next: NextFunction) {
        req['courses'] = this.controller.getCoursesByTeacher(parseInt(req.params.id));
        next();
    }


    public async getCourseInfos(req: Request, res: Response, next: NextFunction) {
        req['course'] = await this.controller.getCourse(parseInt(req.params.id));
        req['students'] = await this.controller.getStudentsFromCourse(parseInt(req.params.id));
        next();
    }

    public async addCourse(req: Request, res: Response, next: NextFunction) : Promise<void>{
        try{
            await this.controller.addCourse(parseInt(req.params.id));
            return res.redirect('/course/' + req.params.id + '/students');
        } catch(error) {

        }
    }

    public deleteCourse(req: Request, res: Response, next: NextFunction) {
        try {
          console.log("deleting course");
          let id: number = parseInt(req.params.id);
          this.controller.deleteCourse(id);
          res.redirect('/course/');
        } catch(error){
          res.sendStatus(404); // We send a 404 status because the questionId is invalid or does not exist
        }
      }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     *
     * For .bind see https://stackoverflow.com/a/15605064/1168342
     */
    init() {
        this.router.post('/:id', this.addCourse.bind(this));
        this.router.get('/:id', this.getCourses.bind(this));
        this.router.delete('/:id', this.deleteCourse.bind(this));
        this.router.get('/:id/infos', this.getCourseInfos.bind(this));
    }

}
