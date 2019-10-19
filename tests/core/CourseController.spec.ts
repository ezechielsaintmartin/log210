import * as chai from 'chai';
import {CourseController} from "../../src/core/CourseController";
import {instance, mock, verify, when} from "ts-mockito";
import {SGB} from "../../src/third-party/SGB";
import {Course} from "../../src/models/Course";

const expect = chai.expect;

let sgbMock: SGB = mock<SGB>();
let controller: CourseController = new CourseController(instance(sgbMock));

describe('CourseController', () => {
    describe('getCourses()', async () => {
        it('returns all courses returned from the SGB', async () => {
            const courses = [
                new Course(1, 'LOG210', 35, '03', 'Something', '2019-01-01', '2020-01-01'),
                new Course(2, 'LOG320', 35, '03', 'Something', '2019-01-01', '2020-01-01')
            ];
            when(sgbMock.getCourses()).thenResolve(courses);

            const actualCourses = await controller.getCourses();

            expect(actualCourses).to.eql(courses);
            verify(sgbMock.getCourses()).once();
        });
    });

    describe('getCourseById()', async () => {
        it('returns a given course', async () => {
            const courses = [
                new Course(1, 'LOG210', 35, '03', 'Something', '2019-01-01', '2020-01-01'),
                new Course(2, 'LOG320', 35, '03', 'Something', '2019-01-01', '2020-01-01')
            ];
            when(sgbMock.getCourses()).thenResolve(courses);

            const actualCourse = await controller.getCourse(2);

            expect(actualCourse).to.eql(courses[1]);
            verify(sgbMock.getCourses()).once();
        });

        it("returns null when the course doesn't exist", async () => {
            const courses = [
                new Course(1, 'LOG210', 35, '03', 'Something', '2019-01-01', '2020-01-01'),
                new Course(2, 'LOG320', 35, '03', 'Something', '2019-01-01', '2020-01-01')
            ];
            when(sgbMock.getCourses()).thenResolve(courses);

            const actualCourse = await controller.getCourse(3);

            expect(actualCourse).to.eql(null);
            verify(sgbMock.getCourses()).once();
        });
    });
});
