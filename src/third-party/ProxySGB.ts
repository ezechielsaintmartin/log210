import {SGB} from "./SGB";
import {Course} from "../models/Course";
import {SGBConfig} from "./SGB.config";
const fetch = require('node-fetch');

export class ProxySGB implements SGB {
    private courses: Course[];
    private token: string;
    private readonly tokenPromise: Promise<void>;

    constructor(){
        this.courses = [];
        this.tokenPromise = this.getToken().then((token) => {
            this.token = token;
        });
    }

    async getCoursesByTeacher(): Promise<Course[]> {
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
