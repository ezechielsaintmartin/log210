import {Course} from "../models/Course";

export interface SGB {
    getCoursesByTeacher(): Promise<Course[]>;
}
