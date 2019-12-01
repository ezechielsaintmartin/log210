import * as chai from 'chai';
import {QuizController} from "../../src/core/QuizController";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";

const expect = chai.expect;

let sgbMock: SGB;
let controller: QuizController;

function setup(){
    sgbMock = mock<SGB>();
    controller = new QuizController(instance(sgbMock));
}

describe('QuizController', () => {
    beforeEach(() => {
        setup();
    });
});
