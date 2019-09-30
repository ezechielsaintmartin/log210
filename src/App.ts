import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fetch from 'node-fetch';

import { questionRoutes } from './routes/QuestionRouter';
import {Question} from "./models/Question";
import {courseRoutes} from "./routes/CourseRouter";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public expressApp: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
    this.expressApp.set('view engine', 'pug');
    this.expressApp.use(express.static(__dirname + '/public')); // https://expressjs.com/en/starter/static-files.html


  }

  // Configure Express middleware.
  private middleware(): void {
    this.expressApp.use(logger('dev'));
    this.expressApp.use(bodyParser.json());
    this.expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    /* This function will change when we start to add more
     * API endpoints */
    let router = express.Router();

    const listeEtudiants = require("./data/students.json");

    // placeholder route handler
    router.get('/', (req, res, next) => {
        res.render('index', { title: 'Itération 1'});
    });

    router.get('/addQuestion', courseRoutes.getCourses.bind(courseRoutes), (req, res, next) => {
        res.render('createQuestionCourseList', {title: 'Itération 1', courses: req['courses']});
    });

    router.get('/course/:id/question', questionRoutes.getQuestionsByCourse.bind(questionRoutes), courseRoutes.getCourse.bind(courseRoutes), (req, res, next) => {
        res.render('questionsByCourse', {title: 'Itération 1', questions: req['questions'], course: req['course']});
    });

      //GET de la vue ajouter de l'objet question
      router.get('/course/:id/question/add', courseRoutes.getCourse.bind(courseRoutes), (req, res, next) => {
          res.render('questions/add', {title: 'Ajouter question', course: req['course']})
      });

    //GET de la vue view de l'objet question
    router.get('/question/:id', questionRoutes.getQuestion.bind(questionRoutes), (req, res, next) => {
        let question: Question = req['question'];
        res.render('questions/view', {
            title: 'Consultation de la question' + question.name,
            question: question
        })
    });

      //GET de la vue view de l'objet question
      router.get('/question/:id/edit', questionRoutes.getQuestion.bind(questionRoutes), (req, res, next) => {
          let question: Question = req['question'];
          res.render('questions/edit', {
              title: 'Modification de la question' + question.name,
              question: question,
              error: !!req.query.error
          })
      });

      //GET de la vue view de l'objet question
      router.get('/question/:id/delete', questionRoutes.getQuestion.bind(questionRoutes), (req, res, next) => {
          let question: Question = req['question'];
          res.render('questions/delete', {
              title: 'Modification de la question' + question.name,
              question: question,
              questionnaires: []
          })
      });

      router.get('/question', questionRoutes.getQuestionsByTeacher.bind(questionRoutes), (req, res, next) => {
          let questions: Question[] = req['questions'];
          res.render('questions/index', {
              title: 'Consultation des questions',
              questions: questions
          })
      });

    this.expressApp.use('/', router);  // base routing

    this.expressApp.use('/api/v1/question', questionRoutes.router);
  }

  private checkLogin(req, res, next) {
      if (req.header.teacherId)
          next();
      else
          res.redirect("/login");
  }
}

export default new App().expressApp;
