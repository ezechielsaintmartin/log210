import {Homework} from "../models/Homework";
import {Quiz} from "../models/Quiz";
import {Course} from "../models/Course";
import {Student} from "../models/Student";

export class HomeworkController {
    // GRASP controller class

    maxId: number;
    homeworks: { [id: number]: Homework };
    students : {[id:number]:Student};

    constructor() {
        this.maxId = 0;
        this.homeworks = {};
    }

    /**
     *  system operatiosn
     */

    public getHomeworkCountByCourse(): {[courseId: number]: number} {
        let homeworkCountByCourse: {[courseId: number]: number} = {};
        for(let key in this.homeworks){
            let homework = this.homeworks[key];
            if (homeworkCountByCourse[homework.courseId]){
                ++homeworkCountByCourse[homework.courseId];
            } else {
                homeworkCountByCourse[homework.courseId] = 1;
            }
        }
        return homeworkCountByCourse;
    }

    public getHomeworksByCourseId(courseId: number): Homework[]{
        let homeworks: Homework[] = [];
        for(let key in this.homeworks){
            let homework = this.homeworks[key];
            if (homework.courseId == courseId){
                homeworks.push(homework);
            }
        }
        return homeworks;
    }

    public async getHomeworkById(homeworkId:number):Promise<Homework>{

        for(let key in this.homeworks){
            let homework = this.homeworks[key];
            if(homework.id == homeworkId) {
                return homework;
            }
        }
    }

    public addHomework(homework: Homework){
        ++this.maxId;
        homework.id = this.maxId;
        this.homeworks[homework.id] = homework;
    }


}
