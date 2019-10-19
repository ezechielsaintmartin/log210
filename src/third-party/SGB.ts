import {Course} from "../models/Course";
import {Student} from "../models/Student";

export abstract class SGB {
    abstract getCourses(): Promise<Course[]>;
    abstract getStudentsByCourse(courseId: number): Promise<Student[]>;
}
