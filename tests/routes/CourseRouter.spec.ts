import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Quiz} from "../../src/models/Quiz";
import {Student} from "../../src/models/Student";
import {CourseRouter} from "../../src/routes/CourseRouter";
import {instance, mock} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";

const expect = chai.expect;

let sgbMock: SGB;
let courseRouter: CourseRouter;

function setup(){
    sgbMock = mock<SGB>();
    courseRouter = new CourseRouter(instance(sgbMock));
}

describe('CourseRouter', () => {
    beforeEach(() => {
        setup();
    });
});
