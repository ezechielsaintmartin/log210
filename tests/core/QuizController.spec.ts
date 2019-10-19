import * as chai from 'chai';
import {QuizController} from "../../src/core/QuizController";

const expect = chai.expect;

let controller: QuizController;

function setup(){
    controller = new QuizController();
}

describe('QuizController', () => {
    beforeEach(() => {
        setup();
    });
});
