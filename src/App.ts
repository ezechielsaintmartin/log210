import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fetch from 'node-fetch';

import { questionRoutes } from './routes/QuestionRouter';
import {Question} from "./models/Question";
import {courseRoutes} from "./routes/CourseRouter";
import {quizRoutes} from "./routes/QuizRouter";
import {ProxySGB} from "./third-party/ProxySGB";

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

    new ProxySGB().getStudentsByCourse(1).then((courses) => {
        console.log(courses);
    });
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

      /**
       * QUESTIONS
       */
    router.get('/addQuestion', courseRoutes.getCourses.bind(courseRoutes), (req, res, next) => {
        res.render('questions/createQuestionCourseList', {title: 'Itération 1', courses: req['courses']});
    });

    router.get('/course/:id/question', questionRoutes.getQuestionsByCourse.bind(questionRoutes), courseRoutes.getCourse.bind(courseRoutes), (req, res, next) => {
        res.render('questions/questionsByCourse', {title: 'Itération 1', questions: req['questions'], course: req['course']});
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
      router.get('/question/:id/delete', questionRoutes.getQuestion.bind(questionRoutes), quizRoutes.getQuizzesByQuestion.bind(quizRoutes), (req, res, next) => {
          let question: Question = req['question'];
          res.render('questions/delete', {
              title: 'Modification de la question' + question.name,
              question: question,
              quizzes: req['quizzes']
          })
      });

      router.get('/question', questionRoutes.getQuestionsByTeacher.bind(questionRoutes), (req, res, next) => {
          let questions: Question[] = req['questions'];
          res.render('questions/index', {
              title: 'Consultation des questions',
              questions: questions
          })
      });

      /**
       * QUIZZES
       */

      router.get('/course/quiz', courseRoutes.getCourses.bind(courseRoutes), quizRoutes.getQuizCountByCourse.bind(quizRoutes), (req, res, next) => {
          res.render('quizzes/courses', {title: 'Liste des cours pour les questionnaires', courses: req['courses'], quizCountByCourse: req['quizCountByCourse']});
      });

      router.get('/course/:id/quiz', courseRoutes.getCourse.bind(courseRoutes), quizRoutes.getQuizzesByCourse.bind(quizRoutes), (req, res, next) => {
          res.render('quizzes/quizzesForCourse', {title: 'Liste des questionnaires du cours', course: req['course'], quizzes: req['quizzes']});
      });

      router.get('/course/:id/quiz/add', courseRoutes.getCourse.bind(courseRoutes), (req, res, next) => {
          res.render('quizzes/add', {title: 'Créer un questionnaire', course: req['course']});
      });

      router.get('/course/:id/quiz/:quizId/tags', courseRoutes.getCourse.bind(courseRoutes), questionRoutes.getTags.bind(questionRoutes), (req, res, next) => {
          res.render('quizzes/tags', {title: 'Choisir une catégorie', course: req['course'], tags: req['tags'], quizId: req.params.quizId});
      });

      router.get('/course/:courseId/quiz/:quizId/:tag', questionRoutes.getQuestionsByTag.bind(questionRoutes), quizRoutes.getQuizCountByQuestion.bind(quizRoutes), (req, res, next) => {
          console.log(req['quizCountByQuestion']);
          res.render('quizzes/questions', {title: 'Ajouter des questions', courseId: req.params.courseId, questions: req['questions'], quizId: req.params.quizId, quizCountByQuestion: req['quizCountByQuestion']});
      });

      router.get('/quizzes', courseRoutes.getCourses.bind(courseRoutes), quizRoutes.getQuizCountByCourse.bind(quizRoutes), (req, res, next) => {
          res.render('quizzes/courseList', {title: 'Liste des cours pour les questionnaires', courses: req['courses'], quizCountByCourse: req['quizCountByCourse']});
      });

      router.get('/course/:id/quizList', quizRoutes.getQuizzesByCourse.bind(quizRoutes), (req, res, next) => {
          res.render('quizzes/viewQuizzesForCourse', {title: 'Liste des questionnaires', quizzes: req['quizzes']});
      });

      router.get('/quiz/:id', quizRoutes.getQuiz.bind(quizRoutes), questionRoutes.getQuestionsByQuiz.bind(questionRoutes),(req, res, next) => {
          console.log(req);
          res.render('quizzes/view', {title: 'Questionnaire', quiz: req['quiz'], result: req['result']});
          console.log(req);
      });

      router.get('/quiz/:id/edit', quizRoutes.getQuiz.bind(quizRoutes), questionRoutes.getQuestionsByQuiz.bind(questionRoutes), (req, res, next) => {
          res.render('quizzes/edit', {title: 'Questionnaire', quiz: req['quiz'], result: req['result']});
      });

    this.expressApp.use('/', router);  // base routing

    this.expressApp.use('/api/v1/question', questionRoutes.router);
    this.expressApp.use('/api/v1/quiz', quizRoutes.router);
  }

  private checkLogin(req, res, next) {
      if (req.header.teacherId)
          next();
      else
          res.redirect("/login");
  }
}

export default new App().expressApp;
