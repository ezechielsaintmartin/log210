import {Course} from "../models/Course"
import {SGB} from "../third-party/SGB";
import {Student} from "../models/Student";

export class CourseController {
    // GRASP controller class
    sgb: SGB;
    courses: Course[];
    //courses: {[id:number]: Course};


    constructor(sgb: SGB) {
        this.sgb = sgb;
        this.courses = [];
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

    public async addCourse(courseId: number): Promise<Course> {
        const sourceCourses = await this.getCoursesFromSource();
        let course = null;
        for(let i = 0; i < sourceCourses.length; ++i){
            if (sourceCourses[i].id == courseId){
                course = sourceCourses[i];
                this.courses.push(course);
            }
        }
        return course;
    }


    public getCoursesByTeacher(teacherId: number): Course[] {
        let courses = [];
        for (let key in this.courses){
            //if (this.questions[key].teacherId == teacherId) Pour l'instant, on ignore l'id de l'enseignant
            courses.push(this.courses[key]);
        }
        return courses;
    }

    public deleteCourse(courseId: number) {
        for (var i = 0; i < this.courses.length; i++ ) {
            if (this.courses[i].id == courseId) {
                this.courses.splice(i, 1);
            }
        }
    }

    public async getStudentsFromCourse(courseId: number): Promise<Student[]>{
        return await this.sgb.getStudentsByCourse(courseId);
    }

    private async getCoursesFromSource(): Promise<Course[]>{
        return await this.sgb.getCourses();
    }

}
