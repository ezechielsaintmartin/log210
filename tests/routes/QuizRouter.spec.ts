import * as chai from 'chai';
import {instance, mock, when} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {QuizRouter} from "../../src/routes/QuizRouter";
import * as express from "express";
import request = require("supertest");
import bodyParser = require("body-parser");
import {CourseController} from "../../src/core/CourseController";

const expect = chai.expect;

let router;
let sgbMock: SGB;
let quizRouter: QuizRouter;

function setup(){
    sgbMock = mock<SGB>();
    quizRouter = new QuizRouter(instance(sgbMock));
    CourseController.getInstance().setSGB(instance(sgbMock));
    router = express();
    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: true}));
}

describe('QuizRouter', () => {
    beforeEach(() => {
        setup();
    });
    it("doesn't crash when calling init()", () => {
        quizRouter.init();
    });
    it('createQuiz', (done) => {
        router.post('/', quizRouter.createQuiz.bind(quizRouter));

        request(router)
            .post('/')
            .send({
                'courseId': 10,
                'description': 'description',
                'active': true
            })
            .set('Content-Type', 'application/json')
            .expect(302, done);
    });
    it('getQuizCountByCourse', async () => {
        let value;
        router.get('/', quizRouter.getQuizCountByCourse.bind(quizRouter), (req, res, next) => {
            value = req['quizCountByCourse'];
            res.sendStatus(200);
        });

        await request(router).get('/');
        expect(value).to.not.be.an('undefined');
    });
    it('getQuizCountByQuestion', async () => {
        let value;
        router.get('/', quizRouter.getQuizCountByQuestion.bind(quizRouter), (req, res, next) => {
            value = req['quizCountByQuestion'];
            res.sendStatus(200);
        });

        await request(router).get('/');
        expect(value).to.not.be.an('undefined');
    });
    it('getQuizzesByCourse', async () => {
        let quizzes, grades;
        router.get('/:id', quizRouter.getQuizzesByCourse.bind(quizRouter), (req, res, next) => {
            quizzes = req['quizzes'];
            grades = req['grades'];
            res.sendStatus(200);
        });

        when(sgbMock.getGrades(30)).thenResolve({});
        when(sgbMock.getStudentsByCourse(30)).thenResolve([]);

        await request(router).get('/30');
        expect(quizzes).to.not.be.an('undefined');
        expect(grades).to.not.be.an('undefined');
    });
    it('getFirstUnansweredQuestion', async () => {
        router.post('/', quizRouter.createQuiz.bind(quizRouter));

        await request(router)
            .post('/')
            .send({
                'courseId': 10,
                'description': 'description',
                'active': true
            })
            .set('Content-Type', 'application/json');

        let question, quizId;
        router.get('/:id', quizRouter.getFirstUnansweredQuestion.bind(quizRouter), (req, res, next) => {
            question = req['question'];
            quizId = req['quizId'];
            res.sendStatus(200);
        });

        await request(router).get('/1');
        expect(question).to.not.be.an('undefined');
        expect(quizId).to.not.be.an('undefined');
    });
});
