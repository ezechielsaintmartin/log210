import {SGB} from "./SGB";
import {Course} from "../models/Course";
import {SGBConfig} from "./SGB.config";
import {Student} from "../models/Student";
const fetch = require('node-fetch');

export class ProxySGB implements SGB {
    private courses: Course[];
    private studentsByCourse: {[id: number]: Student[]};
    private token: string;
    private readonly tokenPromise: Promise<void>;

    constructor(){
        this.courses = [];
        this.studentsByCourse = {};
        this.tokenPromise = this.getToken().then((token) => {
            this.token = token;
        });
    }

    async getCourses(): Promise<Course[]> {
        try {
            await this.tokenPromise;
            if (!this.token)
                return [];
            const host = this.getHost();
            const url = host + '/api/v1/courses';
            const response = await fetch(url, {headers: {token: this.token}});
            const json = await response.json();
            this.courses = json.data.map((course) => new Course(course.id, course.sigle,
                course.nb_max_students, course.groupe,
                course.titre, course.date_debut, course.date_fin));
        } catch (error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return this.courses;
    }

    async getStudentsByCourse(courseId: number): Promise<Student[]>{
        try {
            await this.tokenPromise;
            if (!this.token)
                return [];
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
        return [];
    }

    public async getToken(): Promise<string>{
        try {
            const host = this.getHost();
            const url = host + '/api/v1/login?email=' + SGBConfig.TEACHER_EMAIL + '&password=' + SGBConfig.TEACHER_PASSWORD;
            const response = await fetch(url);
            const json = await response.json();
            return json.token;
        } catch(error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return null;
    }

    private getHost(): string {
        return 'http://' + SGBConfig.HOST + ':' + SGBConfig.PORT;
    }

}
