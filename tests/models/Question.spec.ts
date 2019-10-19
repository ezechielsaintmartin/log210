import * as chai from 'chai';
import {Question} from "../../src/models/Question";

const expect = chai.expect;

let question: Question;

function setup(){
    question = new Question(1,1,1,"Question 1",
        ["Facile","Théorique"],"Statement",false,
        "Success","Failure");
}

describe('Question', () => {
    beforeEach(() => {
        setup();
    });
    it('get set id', () => {
        const newId = 12;
        question.id = newId;
        expect(question.id).to.eql(newId);
    });
    it('get teacher id', () => {
        expect(question.teacherId).to.eql(1);
    });
    it('get course id', () => {
        expect(question.courseId).to.eql(1);
    });
    it('get set name', () => {
        const name = "Question 12";
        question.name = name;
        expect(question.name).to.eql(name);
    });
    it('get set tags', () => {
        const tags = ["Facile", "Théorique"];
        question.tags = tags;
        expect(question.tags).to.eql(tags);
    });
    it('get set statement', () => {
        const statement = "Question 12";
        question.statement = statement;
        expect(question.statement).to.eql(statement);
    });
    it('get set truth', () => {
        const truth = false;
        question.truth = truth;
        expect(question.truth).to.eql(truth);
    });
    it('get set success', () => {
        const successText = "Success";
        question.successText = successText;
        expect(question.successText).to.eql(successText);
    });
    it('get set failure', () => {
        const failureText = "Failure";
        question.failureText = failureText;
        expect(question.failureText).to.eql(failureText);
    });
});
