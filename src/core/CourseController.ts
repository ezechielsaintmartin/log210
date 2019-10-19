import {Course} from "../models/Course"
import {SGB} from "../third-party/SGB";

export class CourseController {
    // GRASP controller class
    sgb: SGB;

    constructor(sgb: SGB) {
        this.sgb = sgb;
    }

    /**
     *  system operatiosn
     */

    public async getCourses(): Promise<Course[]> {
        const sourceCourses = await this.getCoursesFromSource();
        let courses = [];
        for(let key in sourceCourses){
            courses.push(sourceCourses[key]);
        }
        return courses;
    }

    public async getCourse(courseId: number): Promise<Course> {
        const sourceCourses = await this.getCoursesFromSource();
        for(let key in sourceCourses){
            if (sourceCourses[key].id == courseId)
                return sourceCourses[key];
        }
        return null;
    }

    private async getCoursesFromSource(): Promise<Course[]>{
        return await this.sgb.getCourses();
    }

}
