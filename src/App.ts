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

    /*router.get('/questions', this.checkLogin, (req, res, next) => {
        res.render('questions', { title: 'Itération 1'});
    });

    router.get('/login', (req, res, next) => {
        res.render('login', { title: 'Itération 1'});
    });*/

		//=================================================================
		//Questions
		//=================================================================
		//GET de l'index donc la liste des questions disponibles
		router.get('/course/:id/questions', questionRoutes.getQuestionsByCourse.bind(questionRoutes), (req, res, next) => {
		    console.log(req['questions']);
			res.render('questions/index', {
				title: 'Liste des questions',
				questions: req['questions'],
				courseId: req.query.id
			})
		});

		//GET de la vue view de l'objet question
		router.get('/question/:id', questionRoutes.getQuestion.bind(questionRoutes), (req, res, next) => {
			let question: Question = req['question'];
			res.render('questions/view', {
				title: 'Consultation du cours' + question.name,
				question: question
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
