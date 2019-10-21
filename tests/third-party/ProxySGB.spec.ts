import * as chai from 'chai';
import * as chaiFetchMock from 'chai-fetch-mock';
import * as fetchMock from 'fetch-mock';
import {SGBConfig} from "../../src/third-party/SGB.config";

chai.use(chaiFetchMock);

const host = 'http://' + SGBConfig.HOST + ':' + SGBConfig.PORT;
const loginUrl = host + '/api/v1/login?email=' + SGBConfig.TEACHER_EMAIL + '&password=' + SGBConfig.TEACHER_PASSWORD;

describe('ProxySGB', () => {
    after(() => {
         fetchMock.restore();
    });
    describe('getCourses()', () => {
        it('returns the courses', async () => {
            fetchMock.get(loginUrl, {token: 'yes'});
            //fetchMock.get(host + '/api/v1/courses', {courses: });
        });
    });
});
