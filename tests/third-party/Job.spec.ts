import * as chai from 'chai';
import * as chaiFetchMock from 'chai-fetch-mock';
import * as fetchMock from 'fetch-mock';
import {Job} from "../../src/third-party/Job";

const expect = chai.expect;

chai.use(chaiFetchMock);

let job: Job;

function setup(){
    job = new Job('');
}

describe('Job', () => {
    beforeEach(() => {
        setup();
    });
    it('fulfilled', () => {
        expect(job.fulfilled).to.eql(false);
    })
});
