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
    it('get set id', () => {
        const id = 10;
        course.id = id;
        expect(course.id).to.eql(id);
    });
    it('get set teacherId', () => {
        const teacherId = 1;
        expect(course.teacherId).to.eql(teacherId);
    });
    it('get set sigle', () => {
        const sigle = 'LOG320';
        course.sigle = sigle;
        expect(course.sigle).to.eql(sigle);
    });
    it('get set maxNumberOfStudents', () => {
        const maxNumberOfStudents = 3182;
        course.maxNumberOfStudents = maxNumberOfStudents;
        expect(course.maxNumberOfStudents).to.eql(maxNumberOfStudents);
    });
    it('get set group', () => {
        const group = '427389';
        course.group = group;
        expect(course.group).to.eql(group);
    });
    it('get set title', () => {
        const title = 'Algorithmes';
        course.title = title;
        expect(course.title).to.eql(title);
    });
    it('get set startDate', () => {
        const startDate = '2019-01-01';
        course.startDate = startDate;
        expect(course.startDate).to.eql(startDate);
    });
    it('get set endDate', () => {
        const endDate = '2019-02-02';
        course.endDate = endDate;
        expect(course.endDate).to.eql(endDate);
    });
});
