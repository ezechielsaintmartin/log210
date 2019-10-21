import {SGB} from "./SGB";
import {Course} from "../models/Course";
import {SGBConfig} from "./SGB.config";
import {Student} from "../models/Student";
const fetch = require('node-fetch');

export class ProxySGB extends SGB {
    private courses: Course[];
    private readonly studentsByCourse: {[id: number]: Student[]};
    private token: string;
    private tokenPromise: Promise<string>;

    constructor(){
        super();
        this.courses = [];
        this.studentsByCourse = {};
        this.tokenPromise = this.refreshToken();
    }

    async getCourses(): Promise<Course[]> {
        try {
            if (!await this.validateToken())
                return this.courses;
            const host = this.getHost();
            const url = host + '/api/v1/courses';
            const response = await fetch(url, {headers: {token: this.token}});
            const json = await response.json();
            // Pour l'instant j'ai (Minh) mis le teacher id à 1
            this.courses = json.data.map((course) => new Course(course.id, 1, course.sigle,
                course.nb_max_students, course.groupe,
                course.titre, course.date_debut, course.date_fin));
        } catch (error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return this.courses;
    }

    async getStudentsByCourse(courseId: number): Promise<Student[]>{
        try {
            if (!await this.validateToken()){
                if (this.studentsByCourse[courseId])
                    return this.studentsByCourse[courseId];
                else
                    return [];
            }
            const host = this.getHost();
            const url = host + '/api/v1/course/' + courseId + '/students';
            const response = await fetch(url, {headers: {token: this.token}});
            const json = await response.json();
            this.studentsByCourse[courseId] = json.data.map((student) => new Student(student.id, student.first_name,
                student.last_name, student.email, student.permanent_code));
            return this.studentsByCourse[courseId];
        } catch (error) {
            console.error('Error while reading from SGB : ' + error);
        }
        if (this.studentsByCourse[courseId])
            return this.studentsByCourse[courseId];
        else
            return [];
    }

    private async refreshToken(): Promise<string>{
        try {
            const host = this.getHost();
            const url = host + '/api/v1/login?email=' + SGBConfig.TEACHER_EMAIL + '&password=' + SGBConfig.TEACHER_PASSWORD;
            const response = await fetch(url);
            const json = await response.json();
            this.token = json.token;
            return json.token;
        } catch(error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return null;
    }

    private async validateToken() : Promise<boolean>{
        await this.tokenPromise;
        if (this.token)
            return true;
        this.tokenPromise = this.refreshToken();
        await this.tokenPromise;
        return !!this.token;
    }

    private getHost(): string {
        return 'http://' + SGBConfig.HOST + ':' + SGBConfig.PORT;
    }

}
