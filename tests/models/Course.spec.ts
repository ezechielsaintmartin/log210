import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";
import {Course} from "../../src/models/Course";

const expect = chai.expect;

let course: Course;

function setup(){
    course = new Course(1, 1, 'LOG210', 35, '03', 'Something', '2019-01-01', '2020-01-01');
}

describe('Course', () => {
    beforeEach(() => {
        setup();
    });
});
