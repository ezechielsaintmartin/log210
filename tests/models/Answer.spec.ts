import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";

const expect = chai.expect;

let question: Question;
let answer: Answer;

function setup(){
    question = new Question(1,1,1,"Question 1",
        ["Facile","Théorique"],"Statement", 'truth-radio', false,
        "Success","Failure");
    answer = new Answer(0, 0, question, false);
}

describe('Answer', () => {
    beforeEach(() => {
        setup();
    });
    it('get set quizId', () => {
        const quizId = 10;
        answer.quizId = quizId;
        expect(answer.quizId).to.eql(quizId);
    });
    it('get set studentId', () => {
        const studentId = 10;
        answer.studentId = studentId;
        expect(answer.studentId).to.eql(studentId);
    });
    it('get set question', () => {
        const thisQuestion = question;
        answer.question = thisQuestion;
        expect(answer.question).to.eql(thisQuestion);
    });
});
