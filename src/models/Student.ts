export class Student {
    private _id: number;
    private _firstName: string;
    private _lastName: string;
    private _email: string;
    private _permanentCode: string;


    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get permanentCode(): string {
        return this._permanentCode;
    }

    set permanentCode(value: string) {
        this._permanentCode = value;
    }

    constructor(id: number, firstName: string, lastName: string, email: string, permanentCode: string) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._permanentCode = permanentCode;
    }
}
