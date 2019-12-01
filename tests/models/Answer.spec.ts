import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";

const expect = chai.expect;

let question: Question;
let answer: Answer;

function setup(){
    question = new Question(1,1,1,"Question 1",
        ["Facile","Théorique"],"Statement",false,
        "Success","Failure");
    answer = new Answer(0, 0, question, false);
}

describe('Answer', () => {
    beforeEach(() => {
        setup();
    });
});
