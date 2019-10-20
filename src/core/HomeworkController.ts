import {Homework} from "../models/Homework";
import {Quiz} from "../models/Quiz";
import {Course} from "../models/Course";
import {Student} from "../models/Student";
import {SGB} from "../third-party/SGB";

export class HomeworkController {
    // GRASP controller class

    maxId: number;
    //homeworks: { [id: number]: Homework };
    students : {[id:number]:Student};
    // GRASP controller class
    sgb: SGB;

    homeworks : Homework[];

    constructor() {
        this.maxId = 0;
        this.homeworks = [];
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

        //On crée un tableau de devoir
        let homeworks= [];
        //Pour chaque devoir dans le tableau
        for(let key in this.homeworks){
            //On crée une variable  devoir et on récupère le prochain devoir
           let homework = this.homeworks[key];
           //Si l'id du cours est le même entre la varianle de devoir et l'id de la fonction
            if (homework.courseId == courseId){
                    console.log("id du homework"+homework.courseId+"id du paramètre"+courseId)
                //On pousse le devoir dans le tableau de devoir
                homeworks.push(homework);
            }
        }
        return homeworks;

        //const sourceCourses = await this.getCoursesFromSource();
        //let courses = [];
       // for(let key in sourceCourses){
       //     courses.push(sourceCourses[key]);
      //  }
      //  return courses;
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
