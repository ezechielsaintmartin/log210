import { Router, Request, Response, NextFunction } from 'express';

import { QuestionController } from '../core/QuestionController';
import {Question} from "../models/Question";
export class QuestionRouter {
  router: Router;
  controller: QuestionController;  // GRASP controller

  /**
   * Initialize the Router
   */
  constructor() {
    this.controller = new QuestionController();  // init GRASP controller
    this.router = Router();
    this.init();
  }

  public deleteQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      let id: number = parseInt(req.params.id);
      this.controller.deleteQuestion(id);
      res.sendStatus(204); // HTTP 204 No content
    } catch(error){
      res.sendStatus(404); // We send a 404 status because the questionId is invalid or does not exist
    }
  }

  public createQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      let teacherId: number = parseInt(req.body.teacherId);
      let courseId: number = parseInt(req.body.courseId);
      let name: string = req.body.name;
      let tags: string[] = req.body.tags.split(',').map(str => str.trim());
      let statement: string = req.body.statement;
      let truth: boolean = !!req.body.truth;
      let successText: string = req.body.successText;
      let failureText: string = req.body.failureText;

      let question = new Question(-1, teacherId, courseId, name, tags, statement, truth, successText, failureText);

      this.controller.createQuestion(question);

      res.redirect('/course/' + question.courseId + '/question');
    } catch (error) {
      res.sendStatus(400);
    }
  }

  public updateQuestion(req: Request, res: Response, next: NextFunction) {
      try {
        console.log(req.body);
          let teacherId: number = parseInt(req.body.teacherId);
          let courseId: number = parseInt(req.body.courseId);
          let id: number = parseInt(req.body.questionId);
          let name: string = req.body.name;
          let tags: string[] = req.body.tags.split(',').map(str => str.trim());
          let statement: string = req.body.statement;
          let truth: boolean = !!req.body.truth;
          let successText: string = req.body.successText;
          let failureText: string = req.body.failureText;

          let question = new Question(id, teacherId, courseId, name, tags, statement, truth, successText, failureText);

          this.controller.updateQuestion(question);

          res.redirect('/question/'+question.id);
      } catch (error) {
          res.redirect('/question/'+req.body.questionId+'/edit?error=true');
      }
  }

  public getQuestion(req: Request, res: Response, next: NextFunction) {
      req['question'] = this.controller.getQuestion(parseInt(req.params.id));
      next();
  }

  public getQuestionsByTeacher(req: Request, res: Response, next: NextFunction) {
      req['questions'] = this.controller.getQuestionsByTeacher(parseInt(req.params.id));
      next();
  }

  public getQuestionsByCourse(req: Request, res: Response, next: NextFunction) {
      req['questions'] = this.controller.getQuestionsByCourse(parseInt(req.params.id));
      next();
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   *
   * For .bind see https://stackoverflow.com/a/15605064/1168342
   */
  init() {
      this.router.delete('/:id', this.deleteQuestion.bind(this));
      this.router.post('/', this.createQuestion.bind(this));
      this.router.post('/:id', this.updateQuestion.bind(this));
      this.router.get('/:id', this.getQuestion.bind(this));
  }

}

// exporter its configured Express.Router
export const questionRoutes = new QuestionRouter();
questionRoutes.init();
