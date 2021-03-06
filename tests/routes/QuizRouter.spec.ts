import * as chai from 'chai';
import {instance, mock, when} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {QuizRouter} from "../../src/routes/QuizRouter";
import * as express from "express";
import request = require("supertest");
import bodyParser = require("body-parser");
import {CourseController} from "../../src/core/CourseController";
import {Student} from "../../src/models/Student";
import {Quiz} from "../../src/models/Quiz";

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

        quizRouter.controller.createQuiz(new Quiz(0, '', true, 1, [], {}));

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

        let students: Student[] = [new Student(1, 'a', 'b', 'c', 'd')];
        let gradesByQuizByStudent: {[studentId: number]: {[quizId: number]: number}} = {1: {1: 100}};

        when(sgbMock.getGrades(30)).thenResolve(gradesByQuizByStudent);
        when(sgbMock.getStudentsByCourse(30)).thenResolve(students);

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
    it('getQuiz', async () => {
        let quiz, grades;
        router.get('/:id', quizRouter.getQuiz.bind(quizRouter), (req, res, next) => {
            quiz = req['quiz'];
            grades = req['grades'];
            res.sendStatus(200);
        });

        let students: Student[] = [new Student(1, 'a', 'b', 'c', 'd')];
        let gradesByQuizByStudent: {[studentId: number]: {[quizId: number]: number}} = {1: {1: 100}};

        when(sgbMock.getGrades(1)).thenResolve(gradesByQuizByStudent);
        when(sgbMock.getStudentsByCourse(1)).thenResolve(students);

        quizRouter.controller.createQuiz(new Quiz(0, '', true, 1, [], {}));

        await request(router)
            .get('/1')
            .expect(200);

        expect(quiz).to.not.be.an('undefined');
        expect(grades).to.not.be.an('undefined');
    });
});
