import * as chai from 'chai';
import {QuizController} from "../../src/core/QuizController";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {HomeworkController} from "../../src/core/HomeworkController";

const expect = chai.expect;

let sgbMock: SGB;
let controller: HomeworkController;

function setup(){
    sgbMock = mock<SGB>();
    controller = new HomeworkController();
}

describe('HomeworkController', () => {
    beforeEach(() => {
        setup();
    });
});
