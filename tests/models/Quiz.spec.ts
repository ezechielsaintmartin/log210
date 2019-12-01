import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Quiz} from "../../src/models/Quiz";

const expect = chai.expect;

let quiz: Quiz;

function setup(){
    quiz = new Quiz(0, '', true, 0, [], {});
}

describe('Quiz', () => {
    beforeEach(() => {
        setup();
    });
});
