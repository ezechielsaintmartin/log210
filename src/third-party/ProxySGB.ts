import {SGB} from "./SGB";
import {Course} from "../models/Course";
import {SGBConfig} from "./SGB.config";
import {Student} from "../models/Student";
import {Question} from "../models/Question";
const fetch = require('node-fetch');
const cron = require('node-cron');

export class ProxySGB extends SGB {
    private courses: Course[];
    private readonly studentsByCourse: {[id: number]: Student[]};
    private readonly coursesByStudent: {[id: number]: Course[]};
    private readonly gradesByStudent: {[idStudent: number]: {[idQuiz: number]: number}};
    private teacherToken: string;
    private teacherTokenPromise: Promise<string>;
    private studentToken: string;
    private studentTokenPromise: Promise<string>;
    private jobs: Job[];
    private readonly studentId = 2;

    constructor(){
        super();
        this.courses = [];
        this.studentsByCourse = {};
        this.coursesByStudent = {};
        this.gradesByStudent = {};

        this.teacherTokenPromise = this.refreshTeacherToken();
        this.studentTokenPromise = this.refreshStudentToken();
        let tempCourses: {[id: number]: Course} = require("../data/courses.json").reduce((map, obj) => {
            map[obj.id] = obj;
            return map;
        }, {});
        this.coursesByStudent = require("../data/course_student.json").reduce((map, obj) => {
                if (!map[obj.student_id])
                    map[obj.student_id] = [];
                map[obj.student_id].push(tempCourses[obj.course_id]);
                return map;
            }, {});
        console.log();
        this.jobs = [];
        let jobs = this.jobs;

        let sgb = this;
        let cronJob = cron.schedule("*/10 * * * * *", function(){
            jobs.forEach((job) => {
                if (!job.fulfilled)
                    job.execute(sgb.studentToken);
            });
        });
        cronJob.start();
    }

    async getCourses(): Promise<Course[]> {
        try {
            if (!await this.validateTeacherToken())
                return this.courses;
            const host = this.getHost();
            const url = host + '/api/v1/courses';
            const response = await fetch(url, {headers: {token: this.teacherToken}});
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
            if (!await this.validateTeacherToken()){
                if (this.studentsByCourse[courseId])
                    return this.studentsByCourse[courseId];
                else
                    return [];
            }
            const host = this.getHost();
            const url = host + '/api/v1/course/' + courseId + '/students';
            const response = await fetch(url, {headers: {token: this.teacherToken}});
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

    async getCoursesByStudent(): Promise<Course[]> {
        return this.coursesByStudent[this.studentId];
    }

    async addGradeForQuiz(quizId: number, courseId: number, grade: number): Promise<void> {
        try {
            const host = this.getHost();
            const url = host + '/api/v1/student/note?course=' + courseId + '&type=quiz&type_id=' + quizId + '&note=' + grade;
            await this.tryAndFetch(url);
        } catch (error) {
            console.error('Error while writing to SGB : ' + error);
        }
    }

    async getGrades(): Promise<{[quizId: number]: number}> {
        try {
            if (!await this.validateStudentToken()){
                if (this.gradesByStudent[this.studentId])
                    return this.gradesByStudent[this.studentId];
                else
                    return {};
            }
            const host = this.getHost();
            const url = host + '/api/v1/student/notes';
            const response = await fetch(url, {headers: {token: this.teacherToken}});
            const json = await response.json();
            this.gradesByStudent[this.studentId] = json.data.reduce((map, grade) => {
                map[grade.type_id] = grade.note;
            }, {});
            return this.gradesByStudent[this.studentId];
        } catch (error) {
            console.error('Error while reading from SGB : ' + error);
        }
        if (this.gradesByStudent[this.studentId])
            return this.gradesByStudent[this.studentId];
        else
            return {};
    }

    private async refreshTeacherToken(): Promise<string>{
        try {
            const host = this.getHost();
            const url = host + '/api/v1/login?email=' + SGBConfig.TEACHER_EMAIL + '&password=' + SGBConfig.TEACHER_PASSWORD;
            const response = await fetch(url);
            const json = await response.json();
            this.teacherToken = json.token;
            return this.teacherToken;
        } catch(error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return null;
    }

    private async validateTeacherToken(): Promise<string>{
        if (this.teacherTokenPromise){
            await this.teacherTokenPromise;
            if (this.teacherToken)
                return this.teacherToken;
        }
        this.teacherTokenPromise = this.refreshTeacherToken();
        return await this.teacherTokenPromise;
    }

    private async refreshStudentToken(): Promise<string>{
        try {
            const host = this.getHost();
            const url = host + '/api/v1/login?email=' + SGBConfig.STUDENT_EMAIL + '&password=' + SGBConfig.STUDENT_PASSWORD;
            const response = await fetch(url);
            const json = await response.json();
            this.studentToken = json.token;
            return this.studentToken;
        } catch(error) {
            console.error('Error while reading from SGB : ' + error);
        }
        return null;
    }

    private async validateStudentToken(): Promise<string>{
        if (this.studentTokenPromise){
            await this.studentTokenPromise;
            if (this.studentToken)
                return this.studentToken;
        }
        this.studentTokenPromise = this.refreshStudentToken();
        return await this.studentTokenPromise;
    }

    private getHost(): string {
        return 'http://' + SGBConfig.HOST + ':' + SGBConfig.PORT;
    }

    private async tryAndFetch(url: string): Promise<void> {
        let job = new Job(url);
        if (await this.validateStudentToken()){
            await job.execute(this.studentToken);
        }
        this.jobs.push(job);
    }

}
