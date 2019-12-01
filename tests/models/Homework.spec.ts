import * as chai from 'chai';
import {Question} from "../../src/models/Question";
import {Answer} from "../../src/models/Answer";
import {Course} from "../../src/models/Course";
import {Homework} from "../../src/models/Homework";

const expect = chai.expect;

let homework: Homework;

function setup(){
    homework = new Homework(0,0,"",0,"","",true);
}

describe('Homework', () => {
    beforeEach(() => {
        setup();
    });
});
