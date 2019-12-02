import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Quiz} from "../../src/models/Quiz";
import {Answer} from "../../src/models/Answer";

const expect = chai.expect;

let id: number = 1;
let description: string = 'Desc';
let active: boolean = true;
let courseId: number = 1;
let questions: number[] = [];
let answerByQuestionId: {[id: number]: Answer[]} = {};
let quiz: Quiz;

function setup(){
    quiz = new Quiz(id,description, active, courseId, questions, answerByQuestionId);
}

describe('Quiz', () => {
    beforeEach(() => {
        setup();
    });
    it('id', () => {
        expect(quiz.id).to.be.eql(id);

        let newId: number = 2;
        quiz.id = newId;
        expect(quiz.id).to.be.eql(newId);
    });
    it('description', () => {
        expect(quiz.description).to.be.eql(description);

        let newDescription: string = 'New Description';
        quiz.description = newDescription;
        expect(quiz.description).to.be.eql(newDescription);
    });
    it('active', () => {
        expect(quiz.active).to.be.eql(active);

        let newActive: boolean = true;
        quiz.active = newActive;
        expect(quiz.active).to.be.eql(newActive);
    });
    it('courseId', () => {
        expect(quiz.courseId).to.be.eql(courseId);

        let newCourseId: number = 3;
        quiz.courseId = newCourseId;
        expect(quiz.courseId).to.be.eql(newCourseId);
    });
});
