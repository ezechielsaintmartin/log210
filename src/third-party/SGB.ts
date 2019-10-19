import {Course} from "../models/Course";
import {Student} from "../models/Student";

export interface SGB {
    getCourses(): Promise<Course[]>;
    getStudentsByCourse(courseId: number): Promise<Student[]>;
}
