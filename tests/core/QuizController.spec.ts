import * as chai from 'chai';
import {QuizController} from "../../src/core/QuizController";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {Quiz} from "../../src/models/Quiz";

const expect = chai.expect;

let sgbMock: SGB;
let controller: QuizController;
let quiz: Quiz;

function setup(){
    sgbMock = mock<SGB>();
    controller = new QuizController(instance(sgbMock));
    quiz = new Quiz(1, 'Quiz', true, 1, [1], {});
}

describe('QuizController', () => {
    beforeEach(() => {
        setup();
    });
    it('getQuizzesByQuestion', () => {
        controller.createQuiz(quiz);
        let quizzes = controller.getQuizzesByQuestion(1);
        expect(quizzes).to.eql([quiz]);
    });
});
