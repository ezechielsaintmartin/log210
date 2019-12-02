import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Quiz} from "../../src/models/Quiz";
import {Student} from "../../src/models/Student";
import {CourseRouter} from "../../src/routes/CourseRouter";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {HomeworkRouter, homeworkRoutes} from "../../src/routes/HomeworkRouter";

const expect = chai.expect;

let sgbMock: SGB;
let homeworkRouter: HomeworkRouter;

function setup(){
    sgbMock = mock<SGB>();
    homeworkRouter = new HomeworkRouter();
}

describe('HomeworkRouter', () => {
    beforeEach(() => {
        setup();
    });
});
