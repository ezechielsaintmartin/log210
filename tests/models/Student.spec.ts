import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Quiz} from "../../src/models/Quiz";
import {Student} from "../../src/models/Student";

const expect = chai.expect;

let student: Student;

function setup(){
    student = new Student(0, '', '', '', '');
}

describe('Student', () => {
    beforeEach(() => {
        setup();
    });
});
