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
    it('get set id', () => {
        const id = 10;
        student.id = id;
        expect(student.id).to.eql(id);
    });
    it('get set firstName', () => {
        const firstName = 'firstName';
        student.firstName = firstName;
        expect(student.firstName).to.eql(firstName);
    });
    it('get set lastName', () => {
        const lastName = 'lastName';
        student.lastName = lastName;
        expect(student.lastName).to.eql(lastName);
    });
    it('get set email', () => {
        const email = 'email';
        student.email = email;
        expect(student.email).to.eql(email);
    });
    it('get set permanentCode', () => {
        const permanentCode = 'permanentCode';
        student.permanentCode = permanentCode;
        expect(student.permanentCode).to.eql(permanentCode);
    });
});
