import {Course} from "../models/Course";
import {Student} from "../models/Student";

export abstract class SGB {
    abstract getCourses(): Promise<Course[]>;
    abstract getStudentsByCourse(courseId: number): Promise<Student[]>;
    abstract getCoursesByStudent(): Promise<Course[]>;
    abstract addGradeForQuiz(quizId: number, courseId: number, grade: number): Promise<void>;
    abstract getGradesForStudent(): Promise<{[quizId: number]: number}>;
    abstract getGrades(courseId: number): Promise<{[studentId: number]: {[quizId: number]: number}}>
}
