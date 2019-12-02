import * as chai from 'chai';
import {QuizController} from "../../src/core/QuizController";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {HomeworkController} from "../../src/core/HomeworkController";
import {Homework} from "../../src/models/Homework";

const expect = chai.expect;

let sgbMock: SGB;
let controller: HomeworkController;
let homework1: Homework;

function setup(){
    sgbMock = mock<SGB>();
    controller = new HomeworkController();
    homework1 = new Homework(1, 1, 'Description', 20, '2019-01-01', '2019-02-02', true);
}

describe('HomeworkController', () => {
    beforeEach(() => {
        setup();
    });
    it('getHomeworkCountByCourse', () => {
         controller.addHomework(homework1);
         let homeworkCountByCourse = controller.getHomeworkCountByCourse();
         expect(homeworkCountByCourse).to.eql({1: 1});
    });
    it('getHomeworksByCourseId', () => {
        controller.addHomework(homework1);
        let homeworks = controller.getHomeworksByCourseId(1);
        expect(homeworks).to.eql([homework1]);
    });
});
