import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fetch from 'node-fetch';

import { questionRoutes } from './routes/QuestionRouter';
import {Question} from "./models/Question";

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

    const listeCours = require("./data/courses.json");
    const listeEtudiants = require("./data/students.json");

    // placeholder route handler
    router.get('/', (req, res, next) => {
        res.render('index', { title: 'Itération 1'});
    });

    /*router.get('/questions', this.checkLogin, (req, res, next) => {
        res.render('questions', { title: 'Itération 1'});
    });

    router.get('/login', (req, res, next) => {
        res.render('login', { title: 'Itération 1'});
    });*/
    		//=================================================================
		//Cours
		//=================================================================
		//GET de l'index donc la liste des cours disponibles
		router.get('/courses', (req, res, next) => {
			let messages = [];
			res.render('courses/index', {
				title: 'Liste des cours',
				flashedMessages: messages,
				cours: listeCours,
				view: "/courses/View"
			})
		});
		//GET de l'index donc la liste des cours actifs disponibles
		router.get('/courses/actif', (req, res, next) => {
			let messages = [];
			var cour = [];
			for (var item in listeCours) {
				console.log('For ' + item);
				if (listeCours[item]['statut'] == "actif") {
					cour.push(listeCours[item]);
				}
			}
			res.render('courses/index', {
				title: 'Liste des cours',
				flashedMessages: messages,
				cours: cour,
				view: "/questions"
			})
		});

		//GET de la vue view de l'objet cours
		router.get('/courses/View', (req, res, next) => {

			//Id du cours recu en parametres
			var idCoursRecherche = req.query.id;


			let messages = [];

			//Get des donnees dans le fichier json


			var cour = {};
			for (var item in listeCours) {
				console.log('For ' + item);
				if (listeCours[item]['id'] == idCoursRecherche) {
					cour = listeCours[item];
					break;
				}
			}


			res.render('courses/View', {
				title: 'Consultation du cours' + cour['sigle'],
				flashedMessages: messages,
				cours: cour
			})
		});

		//=================================================================
		//Questions
		//=================================================================
		//GET de l'index donc la liste des questions disponibles
		router.get('/course/:id/questions', questionRoutes.getQuestionsByCourse, (req, res, next) => {
			res.render('questions/index', {
				title: 'Liste des questions',
				questions: req['questions'],
				courseId: req.query.id
			})
		});

		//GET de la vue view de l'objet question
		router.get('/question/:id', questionRoutes.getQuestion, (req, res, next) => {
			let question: Question = req['question'];
			res.render('questions/view', {
				title: 'Consultation du cours' + question.name,
				question: question
			})
		});

		//GET de la vue ajouter de l'objet question
		router.get('/course/:id/question/add', (req, res, next) => {

			//Id du cours recu en parametres
			var coursID = req.query.id;

			res.render('questions/add', {title: 'Ajouter question', coursid: coursID})
		});

        //GET de la vue ajouter de l'objet question
		router.get('/Questions/edit', (req, res, next) => {

			//Id de la question recu en parametres
			var questionId = req.query.id;
			var question = listeQuestions.find(x => x.id == questionId);

			res.render('questions/edit', {title: 'Modifier question', question: question})
		});
		router.post('/Questions/edit', (req, res, next) => {

			//Creation d'une nouvelle question
			var question = {
				"id": req.body.questionId,
				"type": "Vrai/Faux",
				"categorie": req.body.tags,
				"nom": req.body.nom,
				"enonce": req.body.enonce,
				"verite": req.body.verite,
				"texteBonneReponse": req.body.texteBonneReponse,
				"texteMauvaiseReponse": req.body.texteMauvaiseReponse
			};
			//Trouver l'index de la question
			var index = listeQuestions.findIndex(x => x.id == question.id);

			//Supprimer la question original
			listeQuestions.splice(index, 1);

			//Inserer la nouvelle question modifier
			listeQuestions.push(question);
			//Rediriger vers la liste des questions
			res.redirect('/questions');
        });

		//GET de l'index donc la liste des questions disponibles
		router.get('/Questions/supprimer', (req, res, next) => {
			var coursID = req.query.coursID;
			var questionID = req.query.questionID;
			for (var q in listeQuestions) {
				if (listeQuestions[q].id == questionID) {
					listeQuestions.splice(q, 1);
					break;
				}
			}
			for (var c in listeCours) {
				for (var q in listeCours[c].questions) {
					if (listeCours[c].questions[q] == questionID) {
						listeCours[c].questions.splice(q, 1);
						break;
					}
				}
			}
			console.log("listq: " + JSON.stringify(listeQuestions));
			console.log("listc: " + JSON.stringify(listeCours));
			//listeQuestions.splice(index,1);
			if (coursID == "undefined") {
				res.redirect('/questions');
			}else {
				res.redirect('/questions?id=' + coursID);
			}
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
