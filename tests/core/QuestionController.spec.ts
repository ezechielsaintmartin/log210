import * as chai from 'chai';
import {QuestionController} from "../../src/core/QuestionController";
import {Question} from "../../src/models/Question";

const expect = chai.expect;

let controller: QuestionController;

function setup(){
    QuestionController.resetInstance();
    controller = QuestionController.getInstance();
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
                [], 'statement', 'truth-radio',  true, 'success', 'fail');
            controller.createQuestion(question, true);
            const newQuestionsCount: number = controller.getQuestionsByTeacher(0).length;
            expect(newQuestionsCount).to.be.eql(questionsCount + 1);
        });
        it("fails if the name already exists", async () => {
            const question = new Question(-1, 1, 1, 'Question 1',
                [], 'statement', 'truth-radio', true, 'success', 'fail');
            expect(controller.createQuestion.bind(controller, question, true)).to.throw();
        });
    });
    describe('getQuestionsByCourse()', () => {
        it("returns all the questions associated with the course", async () => {
            expect(controller.getQuestionsByCourse.bind(controller, 1)).to.not.throw();
        });
    });
    describe('updateQuestion()', () => {
        it("updates question", async () => {
            const initialQuestion = controller.getQuestion(1);
            const updatedQuestion = new Question(1, 1, 1, 'Question 1',
                [], 'statement', 'truth-radio', true, 'success', 'success');
            controller.updateQuestion(updatedQuestion, true);
            const actualQuestion = controller.getQuestion(1);
            expect(actualQuestion).to.eql(updatedQuestion);
            expect(actualQuestion).to.not.eql(initialQuestion);
        });
        it("doesn't create question if id doesn't exist", async () => {
            const updatedQuestion = new Question(4, 1, 3, 'Questionnnn',
                [], 'statement', 'truth-radio', true, 'success', 'success');
            expect(controller.updateQuestion.bind(controller, updatedQuestion, true)).to.throw();
        });
        it("doesn't create question if name already exists", async () => {
            const updatedQuestion = new Question(2, 1, 1, 'Question 1',
                [], 'statement', 'truth-radio', true, 'success', 'success');
            expect(controller.updateQuestion.bind(controller, updatedQuestion)).to.throw();
        });
    });
    describe('getTags()', () => {
        it("returns the question's tags", () => {
            const question = controller.getQuestion(1);
            expect(controller.getTags()).contain(question.tags[0]);
        });
    });
    describe('getQuestionsByTag()', () => {
        it("returns questions with the tag", () => {
            const tags = controller.getTags();
            const questions = controller.getQuestionsByTag(1, tags[0]);
            expect(questions.length).to.be.greaterThan(0);
        });
    });
    describe('getQuestions()', () => {
        it("returns questions with the ids passed as parameters", () => {
            const ids = [1,2,3];
            const questions = controller.getQuestions(ids);
            expect(questions.questions.length).to.eql(ids.length);
        });
    });
});
