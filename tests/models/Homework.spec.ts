import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";
import {Course} from "../../src/models/Course";
import {Homework} from "../../src/models/Homework";

const expect = chai.expect;

let homework: Homework;

function setup(){
    homework = new Homework(0,0,"",0,"","",true);
}

describe('Homework', () => {
    beforeEach(() => {
        setup();
    });
    it('get set id', () => {
        const id = 10;
        homework.id = id;
        expect(homework.id).to.eql(id);
    });
    it('get set courseId', () => {
        const courseId = 10;
        homework.courseId = courseId;
        expect(homework.courseId).to.eql(courseId);
    });
    it('get set description', () => {
        const description = 'something';
        homework.description = description;
        expect(homework.description).to.eql(description);
    });
    it('get set maxGrade', () => {
        const maxGrade = 100;
        homework.maxGrade = maxGrade;
        expect(homework.maxGrade).to.eql(maxGrade);
    });
    it('get set startDate', () => {
        const startDate = '2019-01-01';
        homework.startDate = startDate;
        expect(homework.startDate).to.eql(startDate);
    });
    it('get set endDate', () => {
        const endDate = '2019-02-02';
        homework.endDate = endDate;
        expect(homework.endDate).to.eql(endDate);
    });
    it('get set state', () => {
        const state = false;
        homework.state = state;
        expect(homework.state).to.eql(state);
    });
});
