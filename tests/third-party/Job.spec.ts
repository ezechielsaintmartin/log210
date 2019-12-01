import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";
import {Course} from "../../src/models/Course";
import {Job} from "../../src/third-party/Job";

const expect = chai.expect;

let job: Job;

function setup(){
    job = new Job('');
}

describe('Job', () => {
    beforeEach(() => {
        setup();
    });
});
