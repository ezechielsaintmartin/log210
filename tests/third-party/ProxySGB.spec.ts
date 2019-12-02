import * as chai from 'chai';
import * as chaiFetchMock from 'chai-fetch-mock';
import * as fetchMock from 'fetch-mock';
import {SGBConfig} from "../../src/third-party/SGB.config";
import {ProxySGB} from "../../src/third-party/ProxySGB";
import {Course} from "../../src/models/Course";

chai.use(chaiFetchMock);
const expect = chai.expect;

const host = 'http://' + SGBConfig.HOST + ':' + SGBConfig.PORT;
const loginUrl = host + '/api/v1/login?email=' + SGBConfig.TEACHER_EMAIL + '&password=' + SGBConfig.TEACHER_PASSWORD;

let proxySGB: ProxySGB;
let courses;

function setup(){
    courses = [
        {
            id: 1,
            sigle: 'LOG210',
            nb_max_students: 35,
            groupe: '04',
            titre: 'Analyse et conception de logiciels',
            date_debut: '2019-01-01',
            date_fin: '2019-02-02'
        }
    ]
}

describe('ProxySGB', () => {
    beforeEach(() => {
        setup();
    });
    after(() => {
         fetchMock.restore();
    });
    describe('getCourses()', () => {
        it('returns the courses', async () => {
            fetchMock.get(loginUrl, {token: 'yes'});
            fetchMock.get(host + '/api/v1/courses', {courses: courses});
            /*proxySGB = new ProxySGB();
            let res = await fetch(loginUrl);
            let actualCourses = await proxySGB.getCourses();
            let course = courses[0];
            let expectedCourses = [new Course(course.id, 1, course.sigle,
                course.nb_max_students, course.groupe,
                course.titre, course.date_debut, course.date_fin)];
            expect(actualCourses).to.eql(expectedCourses);*/
        });
    });
});
