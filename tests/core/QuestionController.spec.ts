import * as chai from 'chai';
import {QuestionController} from "../../src/core/QuestionController";
import {Question} from "../../src/models/Question";

const expect = chai.expect;

let controller: QuestionController;

function setup(){
    controller = new QuestionController();
}

describe('QuestionController', () => {
    beforeEach(() => {
        setup();
    });
    describe('deleteQuestion()', () => {
        it('removes a question if it exists', async () => {
            expect(controller.getQuestion(1)).to.not.be.null;
            controller.deleteQuestion(1);
            expect(controller.getQuestion.bind(controller,1)).to.throw();
        });
        it("throws an error if the question doesn't exist", async () => {
            expect(controller.deleteQuestion.bind(controller,0)).to.throw();
        });
    });

    describe('createQuestion()', () => {
        it("creates a new question if the name doesn't already exist", async () => {
            const questionsCount: number = controller.getQuestionsByTeacher(0).length;
            const question = new Question(-1, 1, 1, 'question',
                [], 'statement', true, 'success', 'fail');
            controller.createQuestion(question);
            const newQuestionsCount: number = controller.getQuestionsByTeacher(0).length;
            expect(newQuestionsCount).to.be.eql(questionsCount + 1);
        });
        it("fails if the name already exists", async () => {
            const question = new Question(-1, 1, 1, 'Question 1',
                [], 'statement', true, 'success', 'fail');
            expect(controller.createQuestion.bind(controller, question)).to.throw();
        });
    });
    describe('getQuestionsByCourse()', () => {
        it("returns all the questions associated with the course", async () => {
            expect(controller.getQuestionsByCourse.bind(controller, 1)).to.not.throw();
        });
    });
});
