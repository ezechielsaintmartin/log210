import { Router, Request, Response, NextFunction } from 'express';

import { QuestionController } from '../core/QuestionController';
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
    try{
      let id: number = parseInt(req.params.id);
      this.controller.deleteQuestion(id);
      res.sendStatus(204); // HTTP 204 No content
    } catch(error){
      res.sendStatus(404); // We send a 404 status because the questionId is invalid or does not exist
    }
  }

  public createQuestion(req: Request, res: Response, next: NextFunction) {

  }

  public updateQuestion(req: Request, res: Response, next: NextFunction) {

  }

  public getQuestion(req: Request, res: Response, next: NextFunction) {

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
      this.router.put('/:id', this.updateQuestion.bind(this));
      this.router.get('/:id', this.getQuestion.bind(this));
  }

}

// exporter its configured Express.Router
export const questionRoutes = new QuestionRouter();
questionRoutes.init();
