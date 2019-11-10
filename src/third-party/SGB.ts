import {Course} from "../models/Course";
import {Student} from "../models/Student";

export abstract class SGB {
    abstract getCourses(): Promise<Course[]>;
    abstract getStudentsByCourse(courseId: number): Promise<Student[]>;
    abstract getCoursesByStudent(studentId: number): Promise<Course[]>;
    abstract addGradeForQuiz(studentId: number, quizId: number, courseId: number, grade: number): Promise<void>;
    abstract getGrades(studentId: number): Promise<{[quizId: number]: number}>;
}
