import {Course} from "../models/Course"

export class CourseController {
    // GRASP controller class

    courses: {[id: number]: Course};

    constructor() {
        let data = require("../data/courses.json");
        this.courses = data.reduce((map, obj) => {
            map[obj.id] = obj;
            return map;
        },{});
    }

    /**
     *  system operatiosn
     */

    public getCourses(): Course[] {
        let courses = [];
        for(let key in this.courses){
            courses.push(this.courses[key]);
        }
        return courses;
    }

    public getCourse(courseId: number): Course {
        for(let key in this.courses){
            if (this.courses[key].id == courseId)
                return this.courses[key];
        }
        return null;
    }

}
