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
    console.log("Delete");
    try{
      let id: number = parseInt(req.params.id);
      this.controller.deleteQuestion(id);
      res.sendStatus(204);
    } catch(error){

    }
  }

  /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
  init() {
      this.router.delete('/:id', this.deleteQuestion.bind(this)); // for .bind see https://stackoverflow.com/a/15605064/1168342
  }

}

// exporter its configured Express.Router
export const questionRoutes = new QuestionRouter();
questionRoutes.init();
